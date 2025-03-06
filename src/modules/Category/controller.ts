import { FastifyReply, FastifyRequest } from "fastify";
import categoryService from "./service";
import { CreateOneDtoType } from "./dto/create-one.dto";

const controller = {
  async createOne(
    req: FastifyRequest<{ Body: CreateOneDtoType }>,
    res: FastifyReply,
  ) {
    try {
      const isUserExistBefore = !!(await categoryService.getOneByTitle(
        req.body.title,
      ));
      if (isUserExistBefore) {
        return res.status(400).send({
          statusCode: 400,
          messages: ["Category already exists"],
        });
      }

      const category = await categoryService.createOne(req.body);
      return res.status(201).send({
        statusCode: 201,
        messages: ["Category created successfully"],
        data: { category },
      });
    } catch (error) {
      return res.status(500).send({
        statusCode: 500,
        error,
        messages: ["Internal Server Error"],
      });
    }
  },
};

export default controller;
