import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { ChatProps } from "../../models/chat/chat.model";

export const getExistedChats = async (user_id: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/chat/get-existed-chats`,
    {
      user_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.chats;
};

export function useGetChats(id?: string | null) {
  const queryKey = ["chats", id];

  const { data, error, isLoading, refetch } = useQuery<ChatProps[], any>(
    queryKey,
    () => getExistedChats(Number(id)),
    {
      retry: 2,
    },
  );
  return { data, error, isLoading, refetch };
}
