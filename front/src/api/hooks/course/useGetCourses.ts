import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { TCourse } from "../../models";

async function getCourses() {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/course/get-courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function useGetCourses() {
  const queryKey = ["courses"];
  const {
    data: courses,
    isLoading: coursesLoading,
    refetch,
  } = useQuery<TCourse[], any>(queryKey, () => getCourses());

  return { courses, coursesLoading, refetch };
}
