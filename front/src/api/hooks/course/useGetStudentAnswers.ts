import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { StudentsAnswersProps } from "../../models";

type Props = {
  result: StudentsAnswersProps[];
};

async function getAnswersStudent(
  userId?: string | null,
  test_id?: number | null,
) {
  const token = localStorage.getItem("token");
  const user_id = Number(userId);
  const response = await axios.post(
    `${BASE_URL}/course/get-student-answers`,
    { user_id, test_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetStudentAnswers(
  user_id?: string | null,
  test_id?: number | null,
) {
  const queryKey = ["task-answers", test_id];

  const {
    data: answersStudent,
    error,
    isLoading,
    refetch,
  } = useQuery<Props, any>(
    queryKey,
    () => getAnswersStudent(user_id, test_id),
    {
      retry: 2,
    },
  );

  return { answersStudent, error, isLoading, refetch };
}
