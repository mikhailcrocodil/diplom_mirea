import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCourse } from "../../api/hooks/course/useGetCourse";
import Loading from "../UI/Loading/Loading";
import ErrorMessage from "../UI/Error/Error";
import { CourseInfoModel, TCourse } from "../../api/models";
import { CourseInfo } from "./CourseInfo/ui/CourseInfo";
import useToast from "../../shared/UI/Toast/useToast";

const CurrentCourse = () => {
  const openNotification = useToast();
  const params = useParams().course_id;
  const userId = localStorage.getItem("userId");
  const {
    refetch,
    data: course,
    isLoading,
    error,
  } = useGetCourse(params, userId);
  const [courseInfo, setCourseInfo] = useState<TCourse>();
  const [modulesInfo, setModulesInfo] =
    useState<CourseInfoModel["modules"][]>();

  useEffect(() => {
    if (course) {
      setCourseInfo(course.course[0]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setModulesInfo(course.modules);
    }
  }, [course]);

  useEffect(() => {
    if (params) {
      refetch();
    }
  }, [params, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      {courseInfo && modulesInfo ? (
        <CourseInfo
          refetch={refetch}
          adaptiveTests={course?.adaptiveTests}
          course={courseInfo}
          modules={modulesInfo}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CurrentCourse;
