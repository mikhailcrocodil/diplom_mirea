import { Flex } from "antd";
import { InputStyled, TextAreaStyled } from "../AddMaterial/AddMaterial.styled";
import { FormEvent, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../api/config/config";
import useToast from "../../../../shared/UI/Toast/useToast";
import { Button } from "../../../UI/Button";
import { useTranslation } from "react-i18next";

export const AddModule = ({
  onClose,
  refetch,
}: {
  onClose: () => void;
  refetch?: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const { t } = useTranslation();
  const [description, setDescription] = useState<string>("");
  const [purposeModule, setPurposeModule] = useState("");
  const course_id = localStorage.getItem("course");
  const openNotification = useToast();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/course/add-module`,
      {
        course_id,
        title,
        purpose_module: purposeModule,
        description,
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
        message: t("toasts.module.add_module_scs"),
      });
      if (refetch) {
        refetch();
      }
      onClose();
    } else {
      openNotification({
        type: "error",
        message: t("toasts.module.add_module_error"),
      });
      if (refetch) {
        refetch();
      }
      onClose();
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Flex vertical gap={12}>
        <InputStyled
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder={t("add.module.title")}
        />
        <TextAreaStyled
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder={t("add.module.description")}
        />
        <InputStyled
          onChange={(e) => setPurposeModule(e.target.value)}
          value={purposeModule}
          placeholder={t("add.module.purpose")}
        />
        <Button text={t("add.module.submit")} type={"submit"} />
      </Flex>
    </form>
  );
};
