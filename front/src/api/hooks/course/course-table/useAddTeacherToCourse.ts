import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { useMutation } from "react-query";

async function addTeacherReq(teacher_id: number, course_id: number) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/update-course-teacher`,
    {
      course_id,
      teacher_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useAddTeacherToCourse() {
  const {
    mutate: addTeacher,
    data,
    isSuccess,
  } = useMutation<
    any,
    unknown,
    {
      teacher_id: number;
      course_id: number;
    }
  >(
    ({ teacher_id, course_id }) =>
      addTeacherReq(Number(teacher_id), Number(course_id)),
    {},
  );

  return { addTeacher, isSuccess, data };
}
