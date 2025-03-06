import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../env/env";
import {
  AccessTokenPayloadType,
  RefreshTokenPayloadType,
} from "./helperFuncs.type";

const generateAccessToken = (payload: AccessTokenPayloadType) => {
  const token = jwt.sign(payload, env.tokens.accessToken.key, {
    expiresIn: env.tokens.accessToken.expireIn,
  });
  return token;
};

const getAccessTokenPayload = (token: string) => {
  const payload = jwt.verify(token, env.tokens.accessToken.key);
  return payload;
};

const generateRefreshToken = (payload: RefreshTokenPayloadType) => {
  const token = jwt.sign(payload, env.tokens.refreshToken.key, {
    expiresIn: env.tokens.refreshToken.expireIn,
  });
  return token;
};

const getRefreshTokenPayload = (token: string) => {
  const payload = jwt.verify(token, env.tokens.refreshToken.key);
  return payload;
};

const decodedToken = (token: string) => {
  const payload = jwt.decode(token);
  return payload;
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const isValidHashedPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValidPassword = await bcrypt.compare(password, hashedPassword);

  return isValidPassword;
};

export {
  generateAccessToken,
  generateRefreshToken,
  getAccessTokenPayload,
  getRefreshTokenPayload,
  decodedToken,
  hashPassword,
  isValidHashedPassword,
};
