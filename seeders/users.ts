import User from "../src/modules/User/model";
import { db } from "../MockData/db";
import { sequelize } from "../src/configs/db";
import { UserType } from "../src/modules/user/entity/user.entity";
import { hashPassword } from "../src/utils/helperFuncs/helperFuncs";

const seed = async () => {
  await sequelize.sync({ force: true });

  const users: UserType[] = structuredClone(db.users);
  for (const user of users) {
    user.password = await hashPassword(user.password);
  }

  await User.bulkCreate(users);
  console.log("Users have been seeded!");
};

export default seed;
