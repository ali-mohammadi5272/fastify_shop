import RefreshToken from "../RefreshToken/model";
import { sequelize } from "../../configs/db";
import { Roles } from "./enum/roles.enum";
import { hashPassword } from "../../utils/helperFuncs/helperFuncs";
import {
  DataTypes,
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
} from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare userName: string;
  declare email: string;
  declare role: Roles;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    role: {
      type: DataTypes.ENUM(Roles.ADMIN, Roles.USER),
      allowNull: false,
      defaultValue: Roles.USER,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { tableName: "users", timestamps: true, sequelize }
);

User.hasMany(RefreshToken, {
  foreignKey: "user_id",
});

RefreshToken.belongsTo(User, { foreignKey: "user_id" });

User.beforeCreate(async (user) => {
  const hashedPassword: string = await hashPassword(user.password);
  user.setDataValue("password", hashedPassword);
});

export default User;
