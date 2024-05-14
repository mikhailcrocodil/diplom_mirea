import { CourseCard } from "./CourseCard";
import { Box } from "@mui/material";
import { CourseCardsTitle, CoursesContent } from "./Courses.styles";
import { useTranslation } from "react-i18next";
import { useGetStudentCourses } from "../../../api/hooks/course/useGetStudentCourses";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import React, { useEffect, useState } from "react";
import Loading from "../../UI/Loading/Loading";
import { Flex } from "antd";
import { useTheme } from "../../../utils/theme";
import { useGetUser } from "../../../shared/hooks/useGetUser";
import { UserRole } from "../../../api/models";
import { useGetFullCourses } from "../../../api/hooks/course/course-table/useFullCourses";

const Courses = () => {
  const { t } = useTranslation();
  const { userId } = useLocalStorage();
  const { data, refetch, error, isLoading } = useGetStudentCourses(userId);
  const { userRole } = useGetUser();
  const { courses } = useGetFullCourses();

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box>
      {data?.length || courses?.length ? (
        <>
          <Flex align={"center"} gap={12}>
            <CourseCardsTitle>
              {userRole !== UserRole.ADMIN && t("pageTitle.my_courses")}
              {userRole === UserRole.ADMIN && t("pageTitle.admin_courses")}
            </CourseCardsTitle>
          </Flex>
          <CoursesContent>
            {userRole === UserRole.ADMIN &&
              courses &&
              courses.map((course) => (
                <CourseCard card={course} key={course.course.id} />
              ))}
            {userRole !== UserRole.ADMIN &&
              data &&
              data.map((course) => (
                <CourseCard card={course} key={course.course.id} />
              ))}
          </CoursesContent>
        </>
      ) : (
        <span>{t("errors.not_courses")}</span>
      )}
    </Box>
  );
};

export default Courses;
