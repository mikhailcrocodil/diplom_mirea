import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { CourseInfoModel, CourseModel, TestModel } from "../../models";

async function getTest(id?: string | null) {
  const token = localStorage.getItem("token");
  if (!id) return;
  const response = await axios.get(
    `${BASE_URL}/course/get-test/${Number(id)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetTest(id?: string | null) {
  const queryKey = ["test", id];

  const { data, error, isLoading, refetch } = useQuery<TestModel, any>(
    queryKey,
    () => getTest(id),
    {
      retry: 2,
    },
  );

  return { data, error, isLoading, refetch };
}
