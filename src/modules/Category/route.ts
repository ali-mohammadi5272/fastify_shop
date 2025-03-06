import createCategorySchema from "../../utils/validators/Categories/CreateOne";
import categoryController from "./controller";
import { FastifyInstance } from "fastify";
import { bodyValidator } from "../../utils/middlewares/bodyValidator";
import { CreateOneDtoType } from "./dto/create-one.dto";

const router = (server: FastifyInstance) => {
  server.post(
    "/",
    { preHandler: [bodyValidator<CreateOneDtoType>(createCategorySchema)] },
    categoryController.createOne
  );
};

export default router;
