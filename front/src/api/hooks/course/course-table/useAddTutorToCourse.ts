import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { useMutation } from "react-query";

async function addTeacherReq(tutor_id: number, course_id: number) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/update-course-tutor`,
    {
      course_id,
      tutor_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useAddTutorToCourse() {
  const {
    mutate: addTutor,
    data,
    isSuccess,
  } = useMutation<
    any,
    unknown,
    {
      tutor_id: number;
      course_id: number;
    }
  >(
    ({ tutor_id, course_id }) =>
      addTeacherReq(Number(tutor_id), Number(course_id)),
    {},
  );

  return { addTutor, isSuccess, data };
}
