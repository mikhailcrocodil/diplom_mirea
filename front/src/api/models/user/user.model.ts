export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  TEACHER = "teacher",
}

export interface UserModel {
  id: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  login?: string;
  country?: string;
  city?: string;
  timezone?: string;
  phone?: string;
  access?: boolean;
  date_registration?: string;
  patronymic?: string;
  img?: string;
  role?: UserRole;
}

export interface LoginModel extends UserModel {
  token: string;
  isAuth?: boolean;
  msg?: string;
}

export interface StudentModel extends UserModel {
  dateStart: string;
}

export type TeacherModel = UserModel;
export type AdminModel = UserModel;
