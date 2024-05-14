export enum AppRoutes {
  AUTH = "auth",
  REGISTRATION = "registration",
  MAIN = "main",
  COURSE = "course",
  COURSE_ID = "course_id",
  PROFILE = "profile",
  PROFILE_ID = "profile_id",
  ALL_COURSES = "all_courses",
  MATERIAL = "material",
  MATERIAL_ID = "material_id",
  TEST_ID = "test_id",
  TEST_PASSING = "test_passing",
  MANAGE = "manage",
  MANAGE_USERS = "manage_users",
  MANAGE_COURSES = "manage_courses",
  UPLOAD_FILE = "upload_file",

  ADD = "add",
  ADD_MATERIAL = "add_material",
  ADD_TEST = "add_test",
  ADD_TASK = "add_task",
  ALL_QUESTIONS = "all_questions",

  CHAT = "chat",
  CHAT_ID = "chat_id",

  TASK_ID = "task_id",

  SHOW_TASK_STUDENT_ANSWER = "show_task_student_answer",

  ADAPTIVE_TEST_COURSE_INFO = "adaptive_test_course_info",

  ADAPTIVE_TEST_PAGE = "adaptive_test_page",
  ADAPTIVE_TEST_PAGE_PASSING = "adaptive_test_passing_page",
  ADAPTIVE_TEST_PAGE_STUDENTS_INFO = "adaptive_test_students_info",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.ADAPTIVE_TEST_PAGE_STUDENTS_INFO]:
    "/adaptive-test-students-info/:courseId",
  [AppRoutes.ADAPTIVE_TEST_PAGE]: "/adaptive-test/:testId",
  [AppRoutes.ADAPTIVE_TEST_PAGE_PASSING]: "/adaptive-test/:testId/passing",

  [AppRoutes.CHAT]: "/chat",
  [AppRoutes.CHAT_ID]: ":chat_id",

  [AppRoutes.AUTH]: "/auth",
  [AppRoutes.REGISTRATION]: "/registration",
  [AppRoutes.TASK_ID]: "task/:material_id",
  [AppRoutes.SHOW_TASK_STUDENT_ANSWER]: "task/:material_id/:answer_id",

  [AppRoutes.MAIN]: "",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.ALL_COURSES]: "/courses",
  [AppRoutes.COURSE]: "/course",
  [AppRoutes.MANAGE]: "/manage",
  [AppRoutes.MANAGE_USERS]: "/manage/users",
  [AppRoutes.MANAGE_COURSES]: "/manage/courses",
  [AppRoutes.PROFILE_ID]: ":profile_id",
  [AppRoutes.COURSE_ID]: ":course_id/",

  [AppRoutes.MATERIAL]: "material",
  [AppRoutes.MATERIAL_ID]: ":material_id",

  [AppRoutes.TEST_ID]: "test/:material_id",
  [AppRoutes.TEST_PASSING]: "test/:material_id/passing",

  [AppRoutes.UPLOAD_FILE]: "upload_file",

  [AppRoutes.ADD]: "/add",
  [AppRoutes.ADD_MATERIAL]: "material",
  [AppRoutes.ADD_TEST]: "test",
  [AppRoutes.ADD_TASK]: "task",
  [AppRoutes.ALL_QUESTIONS]: "/all-questions",

  [AppRoutes.ADAPTIVE_TEST_COURSE_INFO]: "/adaptive-test-info/:courseId",
};
