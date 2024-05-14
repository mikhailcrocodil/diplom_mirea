import { Flex } from "antd";
import { InputStyled } from "../AddMaterial/AddMaterial.styled";
import { FormEvent, useEffect, useState } from "react";
import { useAddTheme } from "../../../../api/hooks/course/useAddTheme";
import axios from "axios";
import { BASE_URL } from "../../../../api/config/config";
import useToast from "../../../../shared/UI/Toast/useToast";
import { useTranslation } from "react-i18next";
import { Button } from "../../../UI/Button";

export const AddTheme = ({
  onClose,
  refetch,
}: {
  onClose: () => void;
  refetch?: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const moduleId = localStorage.getItem("moduleId");
  const { t } = useTranslation();
  const openNotification = useToast();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/course/add-theme`,
      {
        moduleId,
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      openNotification({
        type: "success",
        message: t("toasts.theme.add_theme_scs"),
      });
      if (refetch) {
        refetch();
      }
      onClose();
    } else {
      openNotification({
        type: "error",
        message: t("toasts.theme.add_theme_error"),
      });
      if (refetch) {
        refetch();
      }
      onClose();
    }
  };

  return (
    <form style={{ zIndex: 11111111111111 }} onSubmit={(e) => handleSubmit(e)}>
      <Flex vertical gap={6}>
        <InputStyled
          onChange={(e) => {
            e.stopPropagation();
            setTitle(e.target.value);
          }}
          value={title}
          placeholder={t("add.theme.title")}
        />
        <Button
          text={"Создать тему"}
          type={"submit"}
          style={{ width: "fit-content" }}
        />
      </Flex>
    </form>
  );
};
