import authController from "./controller";
import registerSchema from "../../utils/validators/Auth/register";
import loginSchema from "../../utils/validators/Auth/login";
import { FastifyInstance } from "fastify";
import { bodyValidator } from "../../utils/middlewares/bodyValidator";
import { CreateOneDtoType } from "../User/dto/create-one.dto";
import { LoginDtoType } from "./dto/login.dto";

const router = (server: FastifyInstance) => {
  server.post(
    "/register",
    {
      preHandler: [bodyValidator<CreateOneDtoType>(registerSchema)],
    },
    authController.register
  );

  server.post(
    "/login",
    {
      preHandler: [bodyValidator<LoginDtoType>(loginSchema)],
    },
    authController.login
  );
};

export default router;
