import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { CourseModel } from "../../../models";

async function getCourses(id?: string | null) {
  const token = localStorage.getItem("token");
  if (!id) return;
  const response = await axios.get(
    `${BASE_URL}/course/get-users-courses/${Number(id)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetStudentCourses(id?: string | null) {
  const queryKey = ["studentCourses", id];

  const { data, error, isLoading, refetch } = useQuery<CourseModel[], any>(
    queryKey,
    () => getCourses(id),
    {
      retry: 2,
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

  return { data, error, isLoading, refetch };
}
