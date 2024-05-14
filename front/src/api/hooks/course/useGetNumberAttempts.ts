import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import {
  AttemptsProps,
  QuestionAddModel,
  TestModel,
  TTest,
} from "../../models";
import { useNavigate } from "react-router-dom";
import useToast from "../../../shared/UI/Toast/useToast";
import { RoutePath } from "../../../app/routing/libs/routePaths";

async function getCount(testId: number, userId: number): Promise<any> {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/get-user-test-attempts`,
    {
      testId,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetNumberAttempts() {
  const {
    mutate: addTestMutation,
    data,
    error,
    isLoading,
  } = useMutation<
    any,
    unknown,
    {
      testId: number;
      userId: number;
    }
  >(({ userId, testId }) => getCount(testId, userId), {});

  return { addTestMutation, data, error, isLoading };
}
