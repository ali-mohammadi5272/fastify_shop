import { Dialect } from "sequelize";
import { EnvType, TimeFormatType } from "./env.type";

const env: EnvType = {
  db: {
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    name: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
    dialect: process.env.DB_DIALECT as Dialect,
  },

  tokens: {
    accessToken: {
      key: process.env.ACCESS_TOKEN_SECRET_KEY as string,
      expireIn: process.env.ACCESS_TOKEN_EXPIRES_TIME as TimeFormatType,
    },
    refreshToken: {
      key: process.env.REFRESH_TOKEN_SECRET_KEY as string,
      expireIn: process.env.REFRESH_TOKEN_EXPIRES_TIME as TimeFormatType,
    },
  },

  version: process.env.VERSION as string,
  baseUrl: `/api/${process.env.VERSION}`,

  port: process.env.PORT ? +process.env.PORT : 3000,
};

export { env };
