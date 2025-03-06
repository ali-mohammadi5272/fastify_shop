import { mixed, object, string } from "yup";
import { phoneNumberPattern, userNamePattern } from "../../patterns/patterns";
import { Genders } from "../../../modules/User/enum/gender.enum";

const registerSchema = object().shape({
  firstName: string().min(2),
  lastName: string().min(2),
  userName: string().min(4).required().matches(userNamePattern),
  email: string().min(5).email().required(),
  password: string().min(8).required(),
  gender: mixed().required().oneOf([Genders.FEMALE, Genders.MALE]),
  phone: string().matches(phoneNumberPattern).required(),
  image: string(),
});

export default registerSchema;
