import React, { FC, useEffect, useState } from "react";
import { useGetUsersForAdaptiveTest } from "../../../../../api/hooks/course/adaptive-test/useGetUsersForAdaptiveTest";
import { Flex, Select } from "antd";
import { useGetUser } from "../../../../../shared/hooks/useGetUser";
import { Button } from "../../../../UI/Button";
import axios from "axios";
import { BASE_URL } from "../../../../../api/config/config";
import useToast from "../../../../../shared/UI/Toast/useToast";

type Props = {
  onClose: () => void;
  course_id: number;
  handleClose: () => void;
};

const SetAdaptiveTest: FC<Props> = ({ onClose, course_id, handleClose }) => {
  const [currentUserId, setCurrentUserId] = useState<any>();
  const { getUsersMutation, isSuccess, data } = useGetUsersForAdaptiveTest();
  const [users, setUsers] = useState<any>();
  const { setFullName } = useGetUser();
  const token = localStorage.getItem("token");
  const openNotification = useToast();
  useEffect(() => {
    getUsersMutation({ course_id });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = data.users.map((user: any) => {
        return {
          value: user.id,
          label: setFullName(user),
        };
      });
      setUsers(result);
    }
  }, [isSuccess]);

  const onChange = (value: any) => {
    setCurrentUserId(value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleCreateTest = async (e: any) => {
    e.preventDefault();
    if (!currentUserId) {
      return;
    }
    const res = await axios.post(
      `${BASE_URL}/course/create-adaptive-test`,
      {
        user_id: currentUserId,
        course_id: course_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.status === 200) {
      openNotification({
        type: "success",
        message: "Адаптивный тест назначен",
      });
    }
    onClose();
    handleClose();
  };

  return (
    users && (
      <form onSubmit={handleCreateTest}>
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
            text={"Создать адаптивный тест"}
          />
        </Flex>
      </form>
    )
  );
};

export default SetAdaptiveTest;
