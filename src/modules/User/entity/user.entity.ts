import { Roles } from "./../enum/roles.enum";

export interface UserType {
  id: number;
  userName: string;
  email: string;
  role: Roles;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
