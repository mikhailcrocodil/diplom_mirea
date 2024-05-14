import { Flex } from "antd";
import { InputStyled } from "../AddMaterial/AddMaterial.styled";
import { FormEvent, useEffect, useState } from "react";
import { useAddTheme } from "../../../../api/hooks/course/useAddTheme";
import axios from "axios";
import { BASE_URL } from "../../../../api/config/config";
import useToast from "../../../../shared/UI/Toast/useToast";
import { Button } from "../../../UI/Button";
import { useTranslation } from "react-i18next";
import { AuthErrorStyled } from "../../../Authorization/ui/AuthForm.styled";

export const AddCourse = ({
  onClose,
  refetch,
}: {
  onClose: () => void;
  refetch?: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const openNotification = useToast();
  const [msg, setMsg] = useState<any>();
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || duration === "") {
      setMsg(t("validation.not_all_fields"));
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${BASE_URL}/course/add-course`,
        {
          title,
          duration,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
      openNotification({
        type: "success",
        message: t("toasts.course.add_course_scs"),
      });
    }
    if (refetch) {
      refetch();
    }
  }, [isSuccess]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Flex align={"center"} vertical gap={20}>
        <InputStyled
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder={t("add.course.title")}
        />
        <InputStyled
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder={t("add.course.description")}
        />
        <InputStyled
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
          placeholder={t("add.course.duration")}
        />
        {msg && <AuthErrorStyled>{msg}</AuthErrorStyled>}
        <Button
          text={t("add.course.submit")}
          type={"submit"}
          style={{ marginTop: 20 }}
        />
      </Flex>
    </form>
  );
};
