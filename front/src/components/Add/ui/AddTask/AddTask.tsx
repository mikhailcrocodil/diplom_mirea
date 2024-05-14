import { Flex } from "antd";
import {
  DatePickerStyled,
  InputStyled,
} from "../AddMaterial/AddMaterial.styled";
import { useState } from "react";
import { FileUpload } from "../../../../shared/UI/FileUploader/FileUpload";
import { useDateToIso } from "../../../../shared/hooks/useDateToIso";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";
import { Button } from "../../../UI/Button";
import axios from "axios";
import { BASE_URL } from "../../../../api/config/config";
import useToast from "../../../../shared/UI/Toast/useToast";
import { useBackToCourse } from "../../../../shared/hooks/useBackToCourse";
import { Translation, useTranslation } from "react-i18next";

const AddTask = () => {
  const theme_id = localStorage.getItem("themeId");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [task, setTask] = useState("");
  const [final_date, setFinalDate] = useState<any>();
  const { setDateToIso } = useDateToIso();
  const openNotification = useToast();
  const course_id = localStorage.getItem("course");
  const { backToCourse } = useBackToCourse();
  const { t } = useTranslation();
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/course/add-task`,
      {
        img,
        title,
        task,
        final_date,
        theme_id: Number(theme_id),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      if (course_id) {
        backToCourse(course_id, t("toasts.task.add_task_scs"));
      }
    } else {
      openNotification({
        type: "error",
        message: t("toasts.task.add_task_error"),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex vertical gap={20}>
        <Flex vertical gap={12} align={"center"}>
          <FileUpload setValue={setImg} />
          <Translation>{(t) => t("add.task.upload_img")}</Translation>
        </Flex>
        <InputStyled
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("add.task.title")}
        />
        <InputStyled
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder={t("add.task.task")}
        />
        <DatePickerStyled
          disabledDate={disabledDate}
          placeholder={t("add.task.date")}
          onChange={(e: any) => setFinalDate(() => setDateToIso(e))}
          format={{ format: "DD.MM.YYYY" }}
        />
        <Button text={t("add.task.button")} type={"submit"} />
      </Flex>
    </form>
  );
};

export default AddTask;
