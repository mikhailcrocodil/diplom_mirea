import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../../config/config";

type Props = {
  users: {
    id: number;
    name: string;
    surname: string;
    patronymic?: string;
  };
};

async function getUsers(course_id: number) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/get-users-for-adaptive-test`,
    {
      course_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetUsersForAdaptiveTest() {
  const {
    mutate: getUsersMutation,
    data,
    isSuccess,
  } = useMutation<
    Props[],
    unknown,
    {
      course_id: number;
    }
  >(({ course_id }) => getUsers(Number(course_id)), {});

  return { getUsersMutation, isSuccess, data };
}
