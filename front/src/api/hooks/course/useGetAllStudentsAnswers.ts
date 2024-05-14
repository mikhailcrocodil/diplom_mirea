import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { StudentsAnswersProps, UserModel } from "../../models";

type Props = {
  result: StudentsAnswersProps[];
};

async function getAnswersStudent(test_id?: number | null) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/get-all-student-answers`,
    { test_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetAllStudentsAnswers(test_id?: number | null) {
  const queryKey = ["task-answers", test_id];

  const {
    data: allAnswersStudent,
    error,
    isLoading,
    refetch,
  } = useQuery<Props, any>(queryKey, () => getAnswersStudent(test_id), {
    retry: 2,
  });

  return { allAnswersStudent, error, isLoading, refetch };
}
