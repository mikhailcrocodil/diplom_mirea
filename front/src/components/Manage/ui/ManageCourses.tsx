import React from "react";
import { useGetUser } from "../../../shared/hooks/useGetUser";
import { UserRole } from "../../../api/models";
import ErrorMessage from "../../UI/Error/Error";
import { ManageCoursesForm } from "./ManageCoursesForm/ManageCoursesForm";
import { useGetFullCourses } from "../../../api/hooks/course/useFullCourses";

const ManageCourses = () => {
  const { userRole } = useGetUser();
  const { courses, refetch } = useGetFullCourses();

  return userRole === UserRole.ADMIN ? (
    <div>
      {courses && <ManageCoursesForm courses={courses} refetch={refetch} />}
    </div>
  ) : (
    <ErrorMessage message={"У вас нет прав на просмотр этой страницы"} />
  );
};

export default ManageCourses;
