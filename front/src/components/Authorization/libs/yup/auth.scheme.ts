import { InferType, object, string } from "yup";
export const authScheme = object({
  value: string().required("Поле обязательно для заполнения"),
  password: string().required("Поле обязательно для заполнения"),
});

export type AuthType = InferType<typeof authScheme>;
