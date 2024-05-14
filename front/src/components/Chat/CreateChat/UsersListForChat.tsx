import React, { FC, useEffect, useState } from "react";
import { useChat } from "../../../api/hooks/chat/useChat";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { Flex, Select } from "antd";
import { Button } from "../../UI/Button";
import axios from "axios";
import { BASE_URL } from "../../../api/config/config";
import useToast from "../../../shared/UI/Toast/useToast";

type Props = {
  refetch: any;
  onClose: () => void;
};

const createChat = async (my_id: number, another_user_id: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/chat/create-chat`,
    {
      my_id,
      another_user_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};

const UsersListForChat: FC<Props> = ({ refetch, onClose }) => {
  const { getUsersForNewChat } = useChat();
  const [users, setChats] = useState<any>();
  const [currentUserId, setCurrentUserId] = useState<any>();
  const { userId } = useLocalStorage();
  const openNotification = useToast();

  useEffect(() => {
    const setUsersForChat = async () => {
      const res = await getUsersForNewChat(Number(userId));
      setChats(res);
    };
    if (userId) {
      setUsersForChat();
    }
  }, [userId]);

  const onChange = (value: any) => {
    console.log(value);
    setCurrentUserId(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await createChat(Number(userId), currentUserId);
    if (res.status === 200) {
      openNotification({
        type: "success",
        message: "Чат успешно создан",
      });
      refetch();
      onClose();
    }
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    users && (
      <>
        <form onSubmit={handleSubmit}>
          <Flex vertical justify={"center"} gap={20}>
            <Select
              value={currentUserId}
              style={{ width: "50%" }}
              showSearch
              placeholder="Выберите пользователя"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={users}
            />
            <Button
              type={"submit"}
              style={{ width: "fit-content" }}
              text={"Создать чат"}
            />
          </Flex>
        </form>
      </>
    )
  );
};

export default UsersListForChat;
