import { UserType } from "../src/modules/User/entity/user.entity";
import { Genders } from "../src/modules/User/enum/gender.enum";
import { Roles } from "../src/modules/User/enum/roles.enum";

interface DatabaseType {
  users: UserType[];
}

export const db: DatabaseType = {
  users: [
    {
      id: 1,
      firstName: "Ali",
      lastName: "Mohammadi",
      userName: "ali_mohammadi",
      email: "ali_mohammadi@gmail.com",
      role: Roles.ADMIN,
      gender: Genders.MALE,
      age: 20,
      image: "default.image",
      phone: "09152505373",
      password: "ali_mohammadi_123",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
