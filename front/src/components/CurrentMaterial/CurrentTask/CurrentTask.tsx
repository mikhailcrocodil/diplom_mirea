import { useGetTask } from "../../../api/hooks/course/useGetTask";
import { useParams } from "react-router-dom";
import { Flex } from "antd";
import { TextAreaStyled } from "../../Add/ui/AddMaterial/AddMaterial.styled";
import { Fragment, useEffect, useState } from "react";
import { Button } from "../../UI/Button";
import { AuthErrorStyled } from "../../Authorization/ui/AuthForm.styled";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../../../api/config/config";
import { useGetStudentAnswers } from "../../../api/hooks/course/useGetStudentAnswers";
import { useGetUser } from "../../../shared/hooks/useGetUser";
import { UserRole } from "../../../api/models";
import { CurrentTasksAllAnswers } from "./CurrentTasksAllAnswers";
import { useFormatDate } from "../../../shared/hooks/useFormatDate";
import { useTranslation } from "react-i18next";

export const ImgWrapperStyled = styled("div")`
  max-width: 100px;
  max-height: 100px;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const AnswerTextStyled = styled("span")`
  padding: 8px 12px;
  font-size: 18px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

const CurrentTask = () => {
  const task_id = useParams().material_id;
  const user_id = localStorage.getItem("userId");
  const { userRole } = useGetUser();
  const { fullTask } = useGetTask(task_id);
  const { answersStudent, refetch } = useGetStudentAnswers(
    user_id,
    fullTask?.task?.id,
  );
  const [answer, setAnswer] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [isCheckAnswer, setIsCheckAnswer] = useState<boolean | null>(null);
  const task = fullTask?.task;
  const { t } = useTranslation();
  const { formatIsoDate } = useFormatDate();
  const [isOkayDate, setIsOkayDate] = useState(true);

  useEffect(() => {
    if (answer !== "") setMsg("");
  }, [answer]);

  useEffect(() => {
    if (answersStudent?.result.length) {
      const isSomeChecked = answersStudent.result.some(
        (answer, index) =>
          answer.score === 2 && index === answersStudent.result.length - 1,
      );
      setIsCheckAnswer(isSomeChecked);
    } else {
      setIsCheckAnswer(true);
    }
  }, [answersStudent]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (answer === "") {
      setMsg(t("validation.task.answer"));
      return;
    }
    setMsg("");
    const token = localStorage.getItem("token");
    await axios.post(
      `${BASE_URL}/course/add-student-answer`,
      {
        user_id,
        task_id: task?.id,
        answer_text: answer,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    refetch();
  };

  const handleColor = (score: 2 | 3 | 4 | 5 | null) => {
    if (score === 2) return "red";
    else return "green";
  };
  return userRole === UserRole.TEACHER || userRole === UserRole.ADMIN ? (
    <CurrentTasksAllAnswers />
  ) : (
    <div>
      {answersStudent?.result.length ? (
        <Flex vertical gap={12}>
          <h3 style={{ paddingBottom: 20, borderBottom: "1px solid gray" }}>
            {t("task.my_answers")}
          </h3>
          {answersStudent.result.map((answer, index) => (
            <Flex
              gap={16}
              vertical
              style={{
                paddingBottom: "20px",
                borderBottom:
                  answersStudent.result.length - 1 !== index
                    ? "1px solid gray"
                    : "",
              }}
              key={answer.id}
            >
              <Flex vertical align={"start"} gap={12}>
                {task && <span>Название задания: {task.task_title}</span>}
                <Flex vertical gap={12}>
                  {task?.img && (
                    <Flex gap={8} align={"center"}>
                      <span>Изображение задания:</span>
                      <ImgWrapperStyled>
                        <img src={task?.img} alt={task?.task_title} />
                      </ImgWrapperStyled>
                    </Flex>
                  )}
                  {task?.task && <span>Текст задания: {task.task}</span>}
                </Flex>
              </Flex>
              <span>{t("task.my_answer")}</span>
              <AnswerTextStyled>{answer.answer_text}</AnswerTextStyled>
              {answer.is_check ? (
                <span
                  style={{ fontSize: 16, color: handleColor(answer.score) }}
                >
                  {t("task.is_verified")}: {answer.score}
                </span>
              ) : (
                <span style={{ fontSize: 16 }}>{t("task.not_verified")}</span>
              )}
              {answer.teacher_comment && (
                <Flex vertical gap={8}>
                  <span style={{ fontSize: 16 }}>{t("task.comment")}:</span>
                  <AnswerTextStyled>{answer.teacher_comment}</AnswerTextStyled>
                </Flex>
              )}
            </Flex>
          ))}
        </Flex>
      ) : null}
      {task && isCheckAnswer && (
        <form onSubmit={handleSubmit}>
          <Flex style={{ marginTop: 32 }} vertical gap={20}>
            <Flex vertical align={"start"} gap={12}>
              {task && <span>Название задания: {task.task_title}</span>}
              <Flex vertical gap={12}>
                {task?.img && (
                  <Flex gap={8} align={"center"}>
                    <span>Изображение задания:</span>
                    <ImgWrapperStyled>
                      <img src={task?.img} alt={task?.task_title} />
                    </ImgWrapperStyled>
                  </Flex>
                )}
                {task?.task && <span>Текст задания: {task.task}</span>}
              </Flex>
            </Flex>
            <span>{t("task.field")}:</span>
            <TextAreaStyled
              placeholder={t("task.placeholder")}
              onChange={(e) => setAnswer(e.target.value)}
            />
            {msg && <AuthErrorStyled>{msg}</AuthErrorStyled>}
            <Button
              style={{ width: "fit-content" }}
              text={t("task.submit")}
              type={"submit"}
            />
          </Flex>
        </form>
      )}
    </div>
  );
};

export default CurrentTask;
