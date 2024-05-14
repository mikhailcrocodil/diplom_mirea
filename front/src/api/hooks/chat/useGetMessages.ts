import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { MessageProps } from "../../models/chat/chat.model";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";

export const getExistedChats = async (chat_id: number, user_id: number) => {
  const token = localStorage.getItem("token");
  console.log(user_id);
  const response = await axios.post(
    `${BASE_URL}/chat/get-chat-messages`,
    {
      chat_id,
      user_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.messages;
};

export function useGetMessages(id?: string | null) {
  const queryKey = ["messages", id];
  const userId = localStorage.getItem("userId");
  const user_id = Number(userId);
  const { data, error, isLoading, refetch, status } = useQuery<
    MessageProps[],
    any
  >(queryKey, () => getExistedChats(Number(id), user_id), {
    retry: 2,
  });
  return { data, error, isLoading, refetch, status };
}
