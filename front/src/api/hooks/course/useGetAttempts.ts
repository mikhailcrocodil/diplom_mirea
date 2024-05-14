import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import {
  Attemptmodel,
  CourseInfoModel,
  CourseModel,
  TestModel,
} from "../../models";

async function getAttempts(user_id?: number | null, test_id?: number | null) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/get-attempts`,
    {
      user_id,
      test_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetAttempts(
  user_id?: number | null,
  test_id?: number | null,
) {
  const queryKey = ["attempts"];

  const { data, error, isLoading, refetch } = useQuery<any, any>(
    queryKey,
    () => getAttempts(user_id, test_id),
    {
      retry: 3,
    },
  );

  return { data, error, isLoading, refetch };
}
