import { NavLink, useParams } from "react-router-dom";
import { useGetAllStudentsAnswers } from "../../../api/hooks/course/useGetAllStudentsAnswers";
import { useGetTask } from "../../../api/hooks/course/useGetTask";
import { CardStyled } from "./CurrentTask.styled";
import { Flex } from "antd";
import { useGetUser } from "../../../shared/hooks/useGetUser";
import ErrorMessage from "../../UI/Error/Error";
import { useEffect } from "react";
import Loading from "../../UI/Loading/Loading";
import { useTranslation } from "react-i18next";

export const CurrentTasksAllAnswers = () => {
  const task_id = useParams().material_id;
  const { fullTask } = useGetTask(task_id);
  const { setFullName } = useGetUser();
  const { allAnswersStudent, refetch, isLoading } = useGetAllStudentsAnswers(
    Number(fullTask?.task.id),
  );
  const { t } = useTranslation();
  const answerStatus = (score: number | null) => {
    if (score === null) return t("task.not_scored");
    else return score;
  };

  useEffect(() => {
    refetch();
  }, [fullTask?.task.id, refetch, allAnswersStudent]);

  if (isLoading) {
    return <Loading />;
  }

  if (allAnswersStudent?.result.length === 0) {
    return <ErrorMessage message={t("task.not_answer_students")} />;
  }

  return (
    <Flex vertical gap={30}>
      {allAnswersStudent?.result.map((answer) => (
        <CardStyled key={answer.task_id}>
          <span>
            {t("task.answer_for_task")}: {answer.answer_text}{" "}
          </span>
          <span>
            {t("task.student")}: {setFullName(answer.user)}
          </span>
          <span>
            {t("task.status")}: {answerStatus(answer.score)}
          </span>
          <NavLink to={`./${answer.id}`}>{t("task.get_to_answer")}</NavLink>
        </CardStyled>
      ))}
    </Flex>
  );
};
