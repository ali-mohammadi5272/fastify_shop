import { Dialect } from "sequelize";

export type TimeFormatType = `${number}${"s" | "m" | "h" | "d"}`;

export interface EnvType {
  db: {
    username: string;
    password: string;
    name: string;
    host: string;
    port: number;
    dialect: Dialect;
  };

  tokens: {
    accessToken: {
      key: string;
      expireIn: TimeFormatType;
    };
    refreshToken: {
      key: string;
      expireIn: TimeFormatType;
    };
  };

  version: string;
  baseUrl: string;

  port: number;
}
