import RefreshToken from "../RefreshToken/model";
import { sequelize } from "../../configs/db";
import { Roles } from "./enum/roles.enum";
import { Genders } from "./enum/gender.enum";
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
  declare firstName: string;
  declare lastName: string;
  declare userName: string;
  declare email: string;
  declare role: Roles;
  declare gender: Genders;
  declare age: number;
  declare phone: string;
  declare image: string;
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

    firstName: {
      type: DataTypes.STRING,
    },

    lastName: {
      type: DataTypes.STRING,
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

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(Roles.MANAGER, Roles.ADMIN, Roles.USER),
      allowNull: false,
      defaultValue: Roles.USER,
    },

    gender: {
      type: DataTypes.ENUM(Genders.FEMALE, Genders.MALE),
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
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
