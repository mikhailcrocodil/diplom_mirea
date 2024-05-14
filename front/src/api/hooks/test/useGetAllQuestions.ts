import { useMutation, useQuery, useQueryClient } from "react-query";
import { QuestionModel } from "../../models";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { adaptQuestionModel } from "../../models/test/question.model";

async function getQuestions(): Promise<adaptQuestionModel[]> {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/test/get-questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function useGetAllQuestions() {
  const { data, error, isLoading, refetch } = useQuery<
    adaptQuestionModel[],
    adaptQuestionModel[],
    adaptQuestionModel[]
  >("allQuestions", () => getQuestions(), {
    retry: 2,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { data, error, isLoading, refetch };
}
