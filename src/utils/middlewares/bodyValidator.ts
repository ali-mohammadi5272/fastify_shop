import { FastifyReply, FastifyRequest } from "fastify";
import { AnyObject, ObjectSchema, ValidationError } from "yup";

const bodyValidator =
  <T extends AnyObject>(schema: ObjectSchema<T>) =>
  async (req: FastifyRequest<{ Body: T }>, res: FastifyReply) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        const parsedErrors = err.inner.reduce<Record<string, string>>(
          (prev, current) => ({
            ...prev,
            [current.path ?? "unknown"]: current.message,
          }),
          {}
        );

        return res.status(400).send({
          statusCode: 400,
          messages: Object.entries(parsedErrors).map(([_, value]) => value),
        });
      }
    }
  };

export { bodyValidator };
