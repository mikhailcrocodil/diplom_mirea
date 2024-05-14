import {
  DatePickerStyled,
  InputStyled,
} from "../AddMaterial/AddMaterial.styled";
import { Flex } from "antd";
import { FormEvent, useState } from "react";
import { QuestionAddModel, TTest } from "../../../../api/models";
import { useDateToIso } from "../../../../shared/hooks/useDateToIso";
import { Button } from "../../../UI/Button";
import { AuthErrorStyled } from "../../../Authorization/ui/AuthForm.styled";
import { useFormatDate } from "../../../../shared/hooks/useFormatDate";
import { CheckboxStyled } from "../../../TestPassing/TestPassing.styled";
import { useAddTest } from "../../../../api/hooks/course/useAddTest";
import { useTranslation } from "react-i18next";

const AddTest = () => {
  const { formatIsoDate } = useFormatDate();
  const { addTestMutation } = useAddTest();
  const themeId = localStorage.getItem("themeId");
  const { setDateToIso } = useDateToIso();
  const [isMainTestInfo, setIsMainTestInfo] = useState(true);
  const [msg, setMsg] = useState("");
  const { t } = useTranslation();

  const [mainTestInfo, setMainTestInfo] = useState<Omit<TTest, "id">>({
    title: "",
    duration: 0,
    description: "",
    final_date: "",
    number_attempts: 0,
  });

  const [questions, setQuestions] = useState<QuestionAddModel[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionAddModel>({
    question: {
      question_text: "",
    },
    answers: [],
  });

  const handleMainInfoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedDate = new Date();
    const currentDate = new Date(
      selectedDate.getTime() + 3 * 60 * 60 * 1000,
    ).toISOString();
    if (
      mainTestInfo.title === "" ||
      mainTestInfo.title === "" ||
      mainTestInfo.duration === 0
    ) {
      setMsg(t("validation.not_all_fields"));
      return;
    }
    if (mainTestInfo.final_date) {
      if (currentDate > mainTestInfo.final_date) {
        setMsg(t("validation.date_in_past"));
        return;
      }
    }
    setMsg("");
    setIsMainTestInfo(false);
  };

  const handleQuestionSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isFalse = false;
    currentQuestion.answers.map((question) => {
      if (question.is_correct) {
        isFalse = true;
        return;
      }
    });
    if (currentQuestion.question.question_text === "") {
      setMsg(t("add.test.validation.no_question"));
      return;
    }
    if (!isFalse) {
      setMsg(t("add.test.validation.is_set_right"));
      return;
    }
    if (currentQuestion.answers.length === 0) {
      setMsg(t("add.test.validation.no_answers"));
      return;
    }
    setMsg("");
    setQuestions((prevState) => [...prevState, currentQuestion]);
    setCurrentQuestion({
      question: {
        question_text: "",
      },
      answers: [],
    });
  };

  const handleAddAnswer = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: [
        ...prevQuestion.answers,
        { answer_text: "", is_correct: false },
      ],
    }));
  };

  const finishTest = () => {
    const id = Number(themeId);
    addTestMutation({
      themeId: id,
      questions: mainTestInfo,
      infoTest: questions,
    });
  };

  return (
    <Flex vertical gap={16}>
      {isMainTestInfo ? (
        <form onSubmit={handleMainInfoSubmit}>
          <Flex vertical gap={14}>
            <InputStyled
              onChange={(e) =>
                setMainTestInfo({ ...mainTestInfo, title: e.target.value })
              }
              placeholder={t("add.test.test_title")}
            />
            <InputStyled
              onChange={(e) =>
                setMainTestInfo({
                  ...mainTestInfo,
                  description: e.target.value,
                })
              }
              placeholder={t("add.test.test_desc")}
            />
            <InputStyled
              onChange={(e) =>
                setMainTestInfo({
                  ...mainTestInfo,
                  duration: Number(e.target.value),
                })
              }
              placeholder={t("add.test.test_duration")}
            />
            <DatePickerStyled
              onChange={(e: any) =>
                setMainTestInfo({
                  ...mainTestInfo,
                  final_date: setDateToIso(e),
                })
              }
              format={{ format: "DD.MM.YYYY" }}
            />
            <InputStyled
              onChange={(e) =>
                setMainTestInfo({
                  ...mainTestInfo,
                  number_attempts: Number(e.target.value),
                })
              }
              placeholder={t("add.test.test_attempts")}
            />
            <Button
              style={{
                width: "fit-content",
              }}
              type={"submit"}
              text={t("add.test.test_finish_main")}
            />
          </Flex>
        </form>
      ) : (
        <Flex vertical gap={20}>
          <Flex vertical gap={12} justify={"center"}>
            {t("test.title")}: {mainTestInfo.title}
            <span>
              {t("test.numb_att")}:{" "}
              {mainTestInfo.number_attempts === 0
                ? t("test.numb_att_inf")
                : mainTestInfo.duration}
            </span>
            <span>
              {t("test.time")}: {mainTestInfo.duration} {t("common.minutes")}
            </span>
            <span>
              {t("test.date_finish")}: {formatIsoDate(mainTestInfo.final_date)}
            </span>
          </Flex>
          <form onSubmit={handleQuestionSubmit}>
            <Flex vertical gap={20}>
              <InputStyled
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    question: { question_text: e.target.value },
                  })
                }
                value={currentQuestion.question.question_text}
                placeholder={t("add.test.question_title")}
              />
              {currentQuestion.answers.map((answer, index) => (
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
                {questions.length > 0 && (
                  <Button
                    text={t("add.test.finish_test")}
                    onClick={finishTest}
                  />
                )}
              </Flex>
            </Flex>
          </form>
        </Flex>
      )}
      {msg && <AuthErrorStyled>{msg}</AuthErrorStyled>}
    </Flex>
  );
};

export default AddTest;
