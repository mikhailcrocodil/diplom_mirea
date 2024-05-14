import axios from "axios";
import { BASE_URL } from "../../config/config";
import { useGetUser } from "../../../shared/hooks/useGetUser";

export const useChat = () => {
  const { setFullName } = useGetUser();
  const getExistedChats = async (user_id: number) => {
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

  const getUsersForNewChat = async (user_id: number) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/chat/get-users-for-new-chat`,
      {
        user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.data) {
      const data = response.data.users;
      const result = data.map((user: any) => {
        return {
          value: user.id,
          label: setFullName(user),
        };
      });
      return result;
    } else {
      return response;
    }
  };

  return {
    getExistedChats,
    getUsersForNewChat,
  };
};
