import { RoutePath } from "./routePaths";
import { Navigate, RouteObject } from "react-router-dom";
import { lazy } from "react";
import ProfilePage from "../../../pages/ProfilePage";
import AdaptiveTest from "../../../components/TestPassing/AdaptiveTest/AdaptiveTest";

const AuthPage = lazy(() => import("../../../pages/AuthPage"));
const MaterialPage = lazy(() => import("../../../pages/MaterialPage"));
const ChatPage = lazy(() => import("../../../pages/ChatPage"));
const ChatComponent = lazy(
  () => import("../../../components/Chat/MainChatComponent"),
);
const CurrentTest = lazy(
  () => import("../../../components/CurrentMaterial/CurrentTest/CurrentTest"),
);
const TestPassing = lazy(
  () => import("../../../components/TestPassing/TestPassing"),
);
const CurrentMaterial = lazy(
  () => import("../../../components/CurrentMaterial/CurrentMaterial"),
);
const AllCoursesPage = lazy(() => import("../../../pages/CoursesPage"));
const CoursePage = lazy(() => import("../../../pages/CoursePage"));
const RegistrationPage = lazy(() => import("../../../pages/RegistrationPage"));
const AddPage = lazy(() => import("../../../pages/AddPage"));
const AdaptiveTestPage = lazy(
  () =>
    import("../../../components/AdaptiveTest/AdaptiveTest/AdaptiveTestPage"),
);
const AdaptiveTestPassingPage = lazy(
  () =>
    import("../../../components/AdaptiveTest/AdaptiveTest/AdaptiveTestPassing"),
);
const AdaptiveTestCourseInfo = lazy(
  () => import("../../../components/AdaptiveTest/AdaptiveTestCourseInfo"),
);
const CurrentProfile = lazy(
  () => import("../../../components/CurrentProfile/CurrentProfile"),
);
const CurrentCourse = lazy(
  () => import("../../../components/CurrentCourse/CurrentCourse"),
);
const Courses = lazy(() => import("../../../components/Courses/ui/Courses"));
const AdaptiveStudentsInfo = lazy(
  () => import("../../../components/AdaptiveTest/AdaptiveTestStudentsInfo"),
);
const AddMaterial = lazy(
  () => import("../../../components/Add/ui/AddMaterial/AddMaterial"),
);
const AddTest = lazy(
  () => import("../../../components/Add/ui/AddTest/AddTest"),
);
const UploadFile = lazy(
  () => import("../../../components/Add/ui/UploadFile/UploadFile"),
);
const AddTask = lazy(
  () => import("../../../components/Add/ui/AddTask/AddTask"),
);
const ManageCourses = lazy(
  () => import("../../../components/Manage/ui/ManageCourses"),
);
const ManageUsers = lazy(
  () => import("../../../components/Manage/ui/ManageUsers"),
);

const CurrentTask = lazy(
  () => import("../../../components/CurrentMaterial/CurrentTask/CurrentTask"),
);
const CurrentTaskForTeacher = lazy(
  () =>
    import(
      "../../../components/CurrentMaterial/CurrentTask/CurrentTaskForTeacher"
    ),
);
export const routeConfigPublic: RouteObject[] = [
  {
    path: RoutePath.auth,
    element: <AuthPage />,
  },
  {
    path: RoutePath.registration,
    element: <RegistrationPage />,
  },
  {
    path: "*",
    element: <Navigate to={RoutePath.auth} />,
  },
];

export const routeConfigPrivate = [
  {
    path: RoutePath.adaptive_test_page,
    element: <AdaptiveTestPage />,
  },
  {
    path: RoutePath.adaptive_test_students_info,
    element: <AdaptiveStudentsInfo />,
  },
  {
    path: RoutePath.adaptive_test_passing_page,
    element: <AdaptiveTestPassingPage />,
  },
  {
    path: RoutePath.profile,
    element: <ProfilePage />,
    breadcrumb: null,
    children: [
      {
        path: RoutePath.profile_id,
        element: <CurrentProfile />,
        breadcrumb: null,
      },
    ],
  },
  {
    path: RoutePath.adaptive_test_course_info,
    element: <AdaptiveTestCourseInfo />,
    breadcrumb: null,
  },
  {
    path: RoutePath.chat,
    element: <ChatPage />,
    breadcrumb: null,
    children: [
      {
        path: RoutePath.chat_id,
        element: <ChatComponent />,
        breadcrumb: null,
      },
    ],
  },
  {
    path: RoutePath.add,
    element: <AddPage />,
    breadcrumb: null,
    children: [
      {
        path: RoutePath.add_task,
        breadcrumb: null,
        element: <AddTask />,
      },
      {
        path: RoutePath.add_material,
        breadcrumb: null,
        element: <AddMaterial />,
      },
      {
        path: RoutePath.add_test,
        breadcrumb: null,
        element: <AddTest />,
      },
      {
        path: RoutePath.upload_file,
        breadcrumb: null,
        element: <UploadFile />,
      },
    ],
  },
  {
    path: RoutePath.all_courses,
    breadcrumb: null,
    element: <AllCoursesPage />,
    children: [
      {
        path: RoutePath.course_id,
        element: <CurrentCourse />,
        breadcrumb: null,
      },
      {
        path: "",
        element: <Courses />,
        breadcrumb: null,
      },
      {
        path: RoutePath.material,
        element: <MaterialPage />,
        breadcrumb: null,
        children: [
          {
            breadcrumb: null,
            path: RoutePath.material_id,
            element: <CurrentMaterial />,
          },
          {
            breadcrumb: null,
            path: RoutePath.test_id,
            element: <CurrentTest />,
          },
          {
            breadcrumb: null,
            path: RoutePath.test_passing,
            element: <TestPassing />,
          },
          {
            breadcrumb: null,
            path: RoutePath.task_id,
            element: <CurrentTask />,
          },
          {
            breadcrumb: null,
            path: RoutePath.show_task_student_answer,
            element: <CurrentTaskForTeacher />,
          },
        ],
      },
    ],
  },
  {
    path: RoutePath.all_questions,
    element: <AdaptiveTest />,
    breadcrumb: null,
  },
  {
    path: RoutePath.course,
    element: <CoursePage />,
    breadcrumb: null,
  },
  {
    path: RoutePath.manage,
    breadcrumb: null,
  },
  {
    path: RoutePath.manage_users,
    element: <ManageUsers />,
    breadcrumb: null,
  },
  {
    path: RoutePath.manage_courses,
    element: <ManageCourses />,
    breadcrumb: null,
  },
  {
    path: "*",
    element: <Navigate to={RoutePath.all_courses} />,
  },
];
