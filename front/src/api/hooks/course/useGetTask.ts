import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { TaskModel } from "../../models";

async function getTask(id?: string | null) {
  const token = localStorage.getItem("token");
  if (!id) return;
  console.log(id);
  const response = await axios.get(
    `${BASE_URL}/course/get-task/${Number(id)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetTask(id?: string | null) {
  const queryKey = ["task", id];
  const {
    data: fullTask,
    error,
    isLoading,
    refetch,
  } = useQuery<TaskModel, any>(queryKey, () => getTask(id), {
    retry: 2,
  });

  return { fullTask, error, isLoading, refetch };
}
