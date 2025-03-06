import { FastifyReply, FastifyRequest } from "fastify";
import userService from "../User/service";
import refreshTokenService from "../RefreshToken/service";
import { CreateOneDtoType } from "../User/dto/create-one.dto";
import { LoginDtoType } from "./dto/login.dto";
import { phoneNumberPrefixPattern } from "../../utils/patterns/patterns";
import {
  generateAccessToken,
  generateRefreshToken,
  isValidHashedPassword,
} from "../../utils/helperFuncs/helperFuncs";

const controller = {
  async register(
    req: FastifyRequest<{ Body: CreateOneDtoType }>,
    res: FastifyReply
  ) {
    try {
      const changedPhoneNumber = req.body.phone.replace(
        phoneNumberPrefixPattern,
        ""
      );
      req.body.phone = changedPhoneNumber;

      const isUserExistBefore =
        !!(await userService.getOneByUserNameOrEmailOrPhone({
          userName: req.body.userName,
          email: req.body.email,
          phone: req.body.phone,
        }));

      if (isUserExistBefore) {
        return res.status(400).send({
          statusCode: 400,
          messages: [
            "You have been registered with this Username or Email or Phone",
          ],
        });
      }

      const newUser = await userService.createOne(req.body);

      const refreshToken = generateRefreshToken({
        userId: newUser.id,
      });

      const accessToken = generateAccessToken({
        userId: newUser.id,
      });

      await refreshTokenService.createOne({
        token: refreshToken,
        user_id: newUser.id,
      });

      return res.status(201).send({
        statusCode: 201,
        messages: ["User created successfully"],
        data: { refreshToken, accessToken },
      });
    } catch (error) {
      return res.status(500).send({
        statusCode: 500,
        error,
        messages: ["Itnernal Server Error"],
      });
    }
  },

  async login(req: FastifyRequest<{ Body: LoginDtoType }>, res: FastifyReply) {
    try {
      const user = await userService.getOneByIdentifier(req.body.identifier);

      if (!user) {
        return res.status(404).send({
          statusCode: 404,
          error: "Not Found",
          messages: ["User not Found"],
        });
      }

      const isValidPassword = await isValidHashedPassword(
        req.body.password,
        user.password
      );

      if (!isValidPassword) {
        return res.status(400).send({
          statusCode: 400,
          error: "Bad Request",
          messages: ["Userame/Email or Password is not valid"],
        });
      }

      const refreshToken = generateRefreshToken({
        userId: user.id,
      });

      const accessToken = generateAccessToken({
        userId: user.id,
      });

      await refreshTokenService.createOne({
        token: refreshToken,
        user_id: user.id,
      });

      return res.status(200).send({
        statusCode: 200,
        messages: ["Login successfully"],
        data: { refreshToken, accessToken },
      });
    } catch (error) {
      return res.status(500).send({
        statusCode: 500,
        error,
        messages: ["Itnernal Server Error"],
      });
    }
  },
};

export default controller;
