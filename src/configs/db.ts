import { Sequelize } from "sequelize";
import { env } from "../utils/env/env";

const sequelize = new Sequelize({
  database: env.db.name,
  username: env.db.username,
  password: env.db.password,
  host: env.db.host,
  dialect: env.db.dialect,
  port: env.db.port,
});

export { sequelize };
