import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { useMutation } from "react-query";

async function addStudentReq(student_id: number, course_id: number) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/add-new-student`,
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

export function useAddStudentToCourse() {
  const {
    mutate: addStudent,
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
      addStudentReq(Number(student_id), Number(course_id)),
    {},
  );

  return { addStudent, isSuccess, data };
}
