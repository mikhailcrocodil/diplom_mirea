import { InferType, object, ref, string } from "yup";
export const registrationScheme = object({
  login: string().required("Поле обязательно для заполнения"),
  name: string().required("Поле обязательно для заполнения"),
  surname: string().required("Поле обязательно для заполнения"),
  patronymic: string().notRequired(),
  email: string().email().required("Поле обязательно для заполнения"),
  password: string().required("Поле обязательно для заполнения"),
  confirmPassword: string()
    .required("Поле обязательно для заполнения")
    .oneOf([ref("password")], "Пароли должны совпадать"),
});

export type RegistrationType = InferType<typeof registrationScheme>;
