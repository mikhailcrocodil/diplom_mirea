import { useQuery } from "react-query";
import axios from "axios";
import { CourseModel, TCourse } from "../../../models";
import { BASE_URL } from "../../../config/config";

async function getCourses() {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/course/get-all-courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function useGetFullCourses() {
  const queryKey = ["courses_"];
  const {
    data: courses,
    isLoading: coursesLoading,
    refetch,
  } = useQuery<CourseModel[], any>(queryKey, () => getCourses());

  return { courses, coursesLoading, refetch };
}
