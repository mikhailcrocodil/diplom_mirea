import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import useToast from "../../../shared/UI/Toast/useToast";

async function addAttempt(userId: number, testId: number) {
  const token = localStorage.getItem("token");
  const selectedDate = new Date();
  const currentDate = new Date(
    selectedDate.getTime() + 3 * 60 * 60 * 1000,
  ).toISOString();
  const response = await axios.post(
    `${BASE_URL}/course/add-attempt`,
    {
      userId,
      testId,
      currentDate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useAddAttempt() {
  const openNotification = useToast();
  const {
    mutate: addAttemptMutation,
    data,
    error,
    isSuccess,
    isLoading,
  } = useMutation<
    {
      userId: number;
      testId: number;
    },
    unknown,
    {
      userId: number;
      testId: number;
    }
  >(({ userId, testId }) => addAttempt(Number(userId), Number(testId)), {});

  return { addAttemptMutation, isSuccess };
}
