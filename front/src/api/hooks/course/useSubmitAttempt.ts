import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";

async function submitAttempt(attempt_id: number, data: any) {
  const token = localStorage.getItem("token");
  const selectedDate = new Date();
  const end_date = new Date(
    selectedDate.getTime() + 3 * 60 * 60 * 1000,
  ).toISOString();
  const response = await axios.post(
    `${BASE_URL}/course/submit-attempt`,
    {
      attempt_id,
      responses: data,
      end_date,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useSubmitAttempt() {
  const { mutate: addAttemptMutation, isSuccess } = useMutation<
    {
      attempt_id: number;
      data: any;
    },
    unknown,
    {
      attempt_id: number;
      data: any;
    }
  >(({ attempt_id, data }) => submitAttempt(Number(attempt_id), data), {});

  return { addAttemptMutation, isSuccess };
}
