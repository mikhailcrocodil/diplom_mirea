import { useParams } from "react-router-dom";
import { useGetCurrentStudentAnswer } from "../../../api/hooks/course/useGetCurrentAnswer";
import { Flex } from "antd";
import { AnswerTextStyled, ImgWrapperStyled } from "./CurrentTask";
import { useGetTask } from "../../../api/hooks/course/useGetTask";
import { Button, Menu, MenuItem } from "@mui/material";
import { ButtonComponent } from "../../UI/Button/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";
import {
  DatePickerStyled,
  TextAreaStyled,
} from "../../Add/ui/AddMaterial/AddMaterial.styled";
import axios from "axios";
import { BASE_URL } from "../../../api/config/config";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { useGetUser } from "../../../shared/hooks/useGetUser";
import { UserRole } from "../../../api/models";
import { useTranslation } from "react-i18next";

const CurrentTaskForTeacher = () => {
  const { material_id, answer_id } = useParams();
  const { fullTask } = useGetTask(material_id);
  const { userId } = useLocalStorage();
  const { answerStudent, refetch } = useGetCurrentStudentAnswer(
    material_id,
    Number(answer_id),
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [comment, setComment] = useState<string>("");
  const [newDate, setNewDate] = useState<any>();
  const open = Boolean(anchorEl);
  const { userRole } = useGetUser();
  const [selectedScore, setSelectedScore] = useState<any>();
  const isAdmin = userRole === UserRole.ADMIN;
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      `${BASE_URL}/course/add-teacher-answer`,
      {
        score: selectedScore,
        comment: comment,
        student_answer_id: Number(answerStudent?.id),
        teacher_id: Number(userId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    refetch();
    setIsAnswered(true);
  };

  const handleColor = (score: 2 | 3 | 4 | 5 | null) => {
    if (score === 2 || score === null) return "red";
    else return "green";
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleValue = (value: any) => {
    setSelectedScore(value);
  };

  const menuItems = [
    {
      value: "2",
    },
    {
      value: "3",
    },
    {
      value: "4",
    },
    {
      value: "5",
    },
  ];
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <Flex vertical gap={12}>
        <Flex align={"center"} gap={20}>
          <Flex vertical align={"start"} gap={12}>
            {fullTask?.task && (
              <span>Название задания: {fullTask?.task.task_title}</span>
            )}
            <Flex vertical gap={12}>
              {fullTask?.task?.img && (
                <Flex gap={8} align={"center"}>
                  <span>Изображение задания:</span>
                  <ImgWrapperStyled>
                    <img
                      src={fullTask?.task?.img}
                      alt={fullTask?.task?.task_title}
                    />
                  </ImgWrapperStyled>
                </Flex>
              )}
              {fullTask?.task?.task && (
                <span>Текст задания: {fullTask?.task.task}</span>
              )}
            </Flex>
          </Flex>
        </Flex>
        <span style={{ marginTop: 20 }}>Ответ студента: </span>
        <AnswerTextStyled>{answerStudent?.answer_text}</AnswerTextStyled>
        {answerStudent?.is_check ? (
          <span
            style={{ fontSize: 16, color: handleColor(answerStudent.score) }}
          >
            {t("task.is_teacher_answered")}: {answerStudent.score}
          </span>
        ) : (
          <span style={{ color: handleColor(null), fontSize: 16 }}>
            {t("task.is_teacher_not_answered")}
          </span>
        )}
        {!answerStudent?.is_check && !isAdmin && !isAnswered && (
          <Flex align={"center"} gap={20}>
            <Button
              onClick={(e) => handleClick(e)}
              style={{
                fontWeight: 700,
                fontSize: 14,
                position: "relative",
                width: "fit-content",
              }}
              variant={"contained"}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {t("task.set_score")}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.value}
                  onClick={() => handleValue(item.value)}
                >
                  {item.value}
                </MenuItem>
              ))}
            </Menu>
            {selectedScore && (
              <span>
                {t("task.scored")}: {selectedScore}
              </span>
            )}
          </Flex>
        )}
        {selectedScore && !isAnswered && (
          <Flex vertical gap={16} style={{ marginTop: 20 }}>
            <TextAreaStyled
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("task.plch_comment")}
            />
            <DatePickerStyled
              onChange={(e) => setNewDate(e)}
              placeholder={t("task.plch_date")}
            />
            <ButtonComponent type={"submit"} text={t("task.submit_score")} />
          </Flex>
        )}
      </Flex>
    </form>
  );
};

export default CurrentTaskForTeacher;
