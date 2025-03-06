import { CreateOneDtoType } from "./dto/create-one.dto";
import RefreshToken from "./model";

const service = {
  async createOne(body: CreateOneDtoType) {
    return await RefreshToken.create(body);
  },
};

export default service;
