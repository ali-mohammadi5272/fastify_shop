import { Genders } from "../enum/gender.enum";

export interface CreateOneDtoType {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  gender: Genders;
  phone: string;
  image: string;
  password: string;
}
