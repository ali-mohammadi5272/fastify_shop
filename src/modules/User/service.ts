import User from "./model";
import { CreateOneDtoType } from "./dto/create-one.dto";
import { Roles } from "./enum/roles.enum";
import { Op } from "sequelize";

const service = {
  async getAll() {
    return await User.findAll();
  },

  async getAllCount() {
    return User.count();
  },

  async getOne(userId: number) {
    return await User.findOne({ where: { id: userId } });
  },

  async getOneByUserNameOrEmail(user: Pick<User, "userName" | "email">) {
    return await User.findOne({
      where: {
        [Op.or]: [{ userName: user.userName }, { email: user.email }],
      },
    });
  },

  async getOneByIdentifier(identifier: string) {
    return await User.findOne({
      where: {
        [Op.or]: [{ userName: identifier }, { email: identifier }],
      },
    });
  },

  async createOne(body: CreateOneDtoType) {
    const usersCount = await this.getAllCount();

    return await User.create({
      ...body,
      userName: body.userName.toLocaleLowerCase(),
      role: usersCount === 0 ? Roles.ADMIN : Roles.USER,
    });
  },
};

export default service;
