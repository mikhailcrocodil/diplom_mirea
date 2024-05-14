import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";

type Props = {
  id: number;
  name: string;
  surname: string;
  patronymic?: string;
};

async function getUsers(course_id: number, role: string) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/get-users-courses-list`,
    {
      course_id,
      role,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetUsersForCourse() {
  const {
    mutate: getUsersMutation,
    data,
    isSuccess,
  } = useMutation<
    Props[],
    unknown,
    {
      course_id: number;
      role: string;
    }
  >(({ course_id, role }) => getUsers(Number(course_id), role), {});

  return { getUsersMutation, isSuccess, data };
}
