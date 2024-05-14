import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { StudentsAnswersProps } from "../../models";

type Props = {
  result: StudentsAnswersProps;
};

async function getAnswersStudent(
  materialId?: string | null,
  answerId?: number | null,
) {
  const token = localStorage.getItem("token");
  const material_id = Number(materialId);
  const answer_id = Number(answerId);
  const response = await axios.post(
    `${BASE_URL}/course/get-current-student-answer`,
    { material_id, answer_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetCurrentStudentAnswer(
  material_id?: string | null,
  answer_id?: number | null,
) {
  const queryKey = ["task-current-answers", answer_id];

  const {
    data: answerStudent,
    error,
    isLoading,
    refetch,
  } = useQuery<StudentsAnswersProps, any>(
    queryKey,
    () => getAnswersStudent(material_id, answer_id),
    {
      retry: 2,
    },
  );

  return { answerStudent, error, isLoading, refetch };
}
