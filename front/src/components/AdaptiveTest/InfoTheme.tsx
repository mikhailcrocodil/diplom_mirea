import { Button } from "../UI/Button";
import { ModalStyled } from "../UI/Modal/ui/Modal.styled";
import { Flex } from "antd";
import { InputStyled } from "../Add/ui/AddMaterial/AddMaterial.styled";
import { CheckboxStyled, RadioStyled } from "../TestPassing/TestPassing.styled";
import { AuthErrorStyled } from "../Authorization/ui/AuthForm.styled";
import Card from "../UI/Card/Card";
import React, { FC, useEffect, useState } from "react";
import { useTheme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "../../api/config/config";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import useToast from "../../shared/UI/Toast/useToast";

type Props = {
  index: number;
  topic: any;
  handleOpenModalQuestion: () => void;
  handleAddAnswer: any;
  handleCloseModalQuestion: any;
  setCurrentQuestion: any;
  currentQuestion: any;
  addQuestionOpen: any;
  handleGetAdaptiveTestInfo: any;
};

export const InfoTheme: FC<Props> = ({
  topic,
  index,
  handleOpenModalQuestion,
  handleCloseModalQuestion,
  setCurrentQuestion,
  currentQuestion,
  handleGetAdaptiveTestInfo,
  addQuestionOpen,
  handleAddAnswer,
}) => {
  const token = localStorage.getItem("token");
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [msg, setMsg] = useState("");
  const handleAddQuestion = async (e: any) => {
    e.preventDefault();
    const topicId = localStorage.getItem("topicId");
    const isMultiple = currentQuestion.answers.filter(
      (answer: any) => answer.is_correct === true,
    );
    if (isMultiple.length !== 1) {
      setMsg("Должен быть 1 правильный ответ");
      return;
    }
    setMsg("");
    const res = await axios.post(
      `${BASE_URL}/course/add-question-for-adaptive-test`,
      {
        question: currentQuestion.question,
        answers: currentQuestion.answers,
        topic_id: Number(topicId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.status === 200) {
      localStorage.removeItem("topicId");
      handleGetAdaptiveTestInfo();
    }
    handleCloseModalQuestion();
  };
  const openModal = (topic: any) => {
    localStorage.setItem("topicId", topic.id);
    handleOpenModalQuestion();
  };
  const openNotification = useToast();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [questionIdDelete, setQuestionIdDelete] = useState<any>();

  useEffect(() => {
    console.log(questionIdDelete);
  }, [questionIdDelete]);
  const handleDeleteQuestion = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/course/delete-adaptive-test-question`,
      {
        question_id: Number(questionIdDelete),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setQuestionIdDelete(null);
    return response.status;
  };

  const handleOk = async () => {
    const status = await handleDeleteQuestion();
    if (status === 200) {
      openNotification({
        type: "success",
        message: "Вопрос успешно удален",
      });
    }
    setIsModalConfirm(false);
    handleGetAdaptiveTestInfo();
  };

  const handleCancel = () => {
    setIsModalConfirm(false);
  };

  return (
    <Card headerTitle={`Тема ${index + 1}. ${topic.topic_text}`} key={topic.id}>
      <Button
        onClick={() => openModal(topic)}
        style={{ marginBottom: "20px" }}
        text={"Добавить вопрос"}
      />
      <ModalStyled
        width={"1000px"}
        theme={theme}
        onCancel={handleCloseModalQuestion}
        title={"Добавить вопрос для темы адаптивного теста"}
        open={addQuestionOpen}
        footer={null}
      >
        <form onSubmit={(e) => handleAddQuestion(e)}>
          <Flex vertical gap={20}>
            <Flex gap={20}>
              <InputStyled
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    question: {
                      question_text: e.target.value,
                      difficulty: currentQuestion.question.difficulty,
                    },
                  })
                }
                value={currentQuestion.question.question_text}
                placeholder={t("add.test.question_title")}
              />
              <InputStyled
                type={"number"}
                max={8}
                value={currentQuestion.question.difficulty}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    question: {
                      question_text: currentQuestion.question.question_text,
                      difficulty:
                        Number(e.target.value) > 8
                          ? 8
                          : Number(e.target.value) < 1
                            ? 1
                            : Number(e.target.value),
                    },
                  })
                }
                placeholder={"Введите сложность"}
              />
            </Flex>
            {currentQuestion.answers.map((answer: any, index: any) => (
              <Flex align={"center"} gap={96} key={index}>
                <InputStyled
                  style={{ width: "50%" }}
                  value={answer.answer_text} // Используйте value для контроля содержимого инпута
                  onChange={(e) => {
                    const newAnswers = [...currentQuestion.answers];
                    newAnswers[index].answer_text = e.target.value;
                    setCurrentQuestion({
                      ...currentQuestion,
                      answers: newAnswers,
                    });
                  }}
                  placeholder={t("add.test.answer")}
                />
                <CheckboxStyled
                  checked={answer.is_correct} // Управление состоянием чекбокса
                  onChange={(e) => {
                    const newAnswers = [...currentQuestion.answers];
                    newAnswers[index].is_correct = e.target.checked;
                    setCurrentQuestion({
                      ...currentQuestion,
                      answers: newAnswers,
                    });
                  }}
                >
                  {t("add.test.is_right")}
                </CheckboxStyled>
              </Flex>
            ))}
            {msg && <AuthErrorStyled>{msg}</AuthErrorStyled>}
            <Flex gap={100}>
              <Button
                style={{
                  width: "fit-content",
                }}
                onClick={handleAddAnswer}
                type={"button"}
                text={t("add.test.add_answer")}
              />
              <Button
                style={{
                  width: "fit-content",
                }}
                type={"submit"}
                text={t("add.test.finish_qa")}
              />
            </Flex>
          </Flex>
        </form>
      </ModalStyled>
      <Flex vertical>
        {topic.topicQuestions.map((question: any, index: any) => (
          <Card
            headerTitle={`Вопрос ${index + 1}. ${question.question_text}`}
            key={question.id}
          >
            <Button
              text={"Удалить вопрос"}
              onClick={() => {
                setQuestionIdDelete(question.id);
                setIsModalConfirm(true);
              }}
            />
            <ConfirmModal
              open={isModalConfirm}
              title={"Удаление вопроса адаптивного теста"}
              handleCancel={handleCancel}
              handleOk={handleOk}
            />
            <span style={{ fontWeight: 450, paddingLeft: 16 }}>
              Сложность вопроса: {question.difficulty}
            </span>
            <Flex style={{ marginTop: "20px" }} vertical gap={6}>
              {question.answers.map((answer: any) => (
                <RadioStyled
                  disabled
                  key={answer.id}
                  checked={answer.is_correct}
                  value={answer.answer_text}
                >
                  {answer.answer_text}
                </RadioStyled>
              ))}
            </Flex>
          </Card>
        ))}
      </Flex>
    </Card>
  );
};
