import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";

async function addMessage(chat_id: number, user_id: number, text: string) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/chat/send-message`,
    {
      chat_id,
      user_id,
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useSendMessage() {
  const { mutate: sendMessageMutation, isSuccess } = useMutation<
    {
      chat_id: string;
      user_id: string;
      text: string;
    },
    unknown,
    {
      chat_id: string;
      user_id: string;
      text: string;
    }
  >(({ chat_id, user_id, text }) =>
    addMessage(Number(chat_id), Number(user_id), text),
  );

  return { sendMessageMutation, isSuccess };
}
