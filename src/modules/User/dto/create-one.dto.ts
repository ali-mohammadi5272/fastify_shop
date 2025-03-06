import { Genders } from "../enum/gender.enum";

export interface CreateOneDtoType {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  gender: Genders;
  age: number;
  phone: string;
  image: string;
  password: string;
}
