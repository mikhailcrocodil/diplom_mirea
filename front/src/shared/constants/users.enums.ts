export enum Roles {
  STUDENT = "student",
  TEACHER = "teacher",
  ADMIN = "admin",
}

export const UsersRoles: Record<Roles, string> = {
  [Roles.STUDENT]: "студент",
  [Roles.TEACHER]: "преподаватель",
  [Roles.ADMIN]: "администратор",
};
