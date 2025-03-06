import fastify from "fastify";
import cors from "@fastify/cors";
import authRouter from "./src/modules/Auth/route";
import categoryRouter from "./src/modules/Category/route";
import { env } from "./src/utils/env/env";
import { sequelize } from "./src/configs/db";

const server = fastify();

server.register(cors, { origin: "*" });

server.register(
  (server) => {
    server.register(authRouter, { prefix: "/auth" });
    server.register(categoryRouter, { prefix: "/categories" });
  },
  { prefix: env.baseUrl },
);

server.listen({ port: env.port }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  try {
    await sequelize.sync();
    console.log("✅ Connecting to Database successfully");
    console.log(`💻 Server listening at ${address}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
