import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { useMutation } from "react-query";

async function removeStudentReq(student_id: number, course_id: number) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/remove-student-from-course`,
    {
      course_id,
      student_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useRemoveStudentFromCourse() {
  const {
    mutate: removeStudent,
    data,
    isSuccess,
  } = useMutation<
    any,
    unknown,
    {
      student_id: number;
      course_id: number;
    }
  >(
    ({ student_id, course_id }) =>
      removeStudentReq(Number(student_id), Number(course_id)),
    {},
  );

  return { removeStudent, isSuccess, data };
}
