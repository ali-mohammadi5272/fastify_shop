import { object, string } from "yup";

const createCategorySchema = object().shape({
  title: string().min(2).required(),
});

export default createCategorySchema;
