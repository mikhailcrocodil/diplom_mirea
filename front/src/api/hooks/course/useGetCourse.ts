import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { CourseInfoModel } from "../../models";

async function getCourse(id?: string | null, userId?: string | null) {
  const token = localStorage.getItem("token");
  if (!id) return;
  const response = await axios.post(
    `${BASE_URL}/course/get-course`,
    {
      courseId: Number(id),
      studentId: Number(userId),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetCourse(id?: string | null, userId?: string | null) {
  const queryKey = ["course", id];

  const { data, error, isLoading, refetch } = useQuery<CourseInfoModel, any>(
    queryKey,
    () => getCourse(id, userId),
    {
      retry: 2,
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

  return { data, error, isLoading, refetch };
}
