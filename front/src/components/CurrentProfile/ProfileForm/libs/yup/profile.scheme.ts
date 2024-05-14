import { InferType, object, string } from "yup";
export const profileEditScheme = object({
  img: string(),
  name: string(),
  surname: string(),
  patronymic: string().notRequired(),
  value: string(),
  password: string(),
  confirmPassword: string(),
  email: string(),
  login: string(),
});

export type ProfileType = InferType<typeof profileEditScheme>;
