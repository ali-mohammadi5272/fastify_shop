import { Genders } from "../enum/gender.enum";
import { Roles } from "../enum/roles.enum";

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: Roles;
  gender: Genders;
  phone: string;
  image: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
