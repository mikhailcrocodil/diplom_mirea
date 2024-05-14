import { useNavigate, useParams } from "react-router-dom";
import { Flex, Radio } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { BASE_URL } from "../../../api/config/config";
import {
  RadioStyled,
  TestAnswersStyled,
  TestAnswerStyled,
} from "../../TestPassing/TestPassing.styled";

type props = {
  isCurrentQuestion: boolean;
  isPreviousQuestion: boolean; // Добавляем новый пропс
  isAnswered: boolean;
  onAnswerChange: any;
  userAnswer: any;
};

const AnswerBlock = styled("div")<props>`
  cursor: pointer;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  width: 40px;
  color: ${({
    isCurrentQuestion,
    isPreviousQuestion,
    isAnswered,
    userAnswer,
  }) =>
    isCurrentQuestion
      ? "orange"
      : isPreviousQuestion
        ? "green"
        : userAnswer !== undefined
          ? "green"
          : "gray"};
  border-color: ${({
    isCurrentQuestion,
    isPreviousQuestion,
    isAnswered,
    userAnswer,
  }) =>
    isCurrentQuestion
      ? "orange"
      : isPreviousQuestion
        ? "green"
        : userAnswer !== undefined
          ? "green"
          : "gray"};
`;

const AdaptiveTestPassing = () => {
  const navigate = useNavigate();
  const [myArray, setMyArray] = useState(
    Array.from({ length: 40 }, (_, i) => (i + 1).toString()),
  );
  const user_id = Number(localStorage.getItem("userId"));
  const course_id = Number(localStorage.getItem("courseId"));
  const handleFinish = async () => {
    const questionId = localStorage.getItem("questionId");
    const topicId = localStorage.getItem("topicId");
    const response = await fetch(
      `${BASE_URL}/course/answer-adaptive-test-question`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_question_index: currentQuestion,
          test_id: testId,
          course_id,
          user_id,
          topic_id: Number(topicId),
          answer_id: answerId,
          question_id: Number(questionId),
          currentDifficulty: currentDifficulty,
        }),
      },
    );
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("topicId");
    localStorage.removeItem("remainingQuestions");
    localStorage.removeItem("questionId");
    localStorage.removeItem("remainingAnswers");
    navigate(`./adaptive-test/${testId}`);
  };

  function saveQuestionsToLocalStorage(
    currentQuestionIndex: any,
    questions: any,
    answers: any,
    questionId: any,
    topicId: any,
  ) {
    console.log(topicId);
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    localStorage.setItem("topicId", topicId);
    localStorage.setItem("remainingQuestions", questions);
    localStorage.setItem("questionId", questionId);
    localStorage.setItem("remainingAnswers", JSON.stringify(answers));
  }

  function saveAnsweredQuestionsToLocalStorage(answeredQuestions: number[]) {
    localStorage.setItem(
      "answeredQuestions",
      JSON.stringify(answeredQuestions),
    );
  }

  function loadQuestionsFromLocalStorage() {
    const currentQuestionIndex = localStorage.getItem("currentQuestionIndex");
    const currentQuestionId = localStorage.getItem("questionId");
    return {
      currentQuestionId:
        currentQuestionId !== null ? parseInt(currentQuestionId) : 0,
      currentQuestionIndex:
        currentQuestionIndex !== null ? parseInt(currentQuestionIndex) : 0,
      remainingQuestions: localStorage.getItem("remainingQuestions"),
    };
  }

  const [userAnswers, setUserAnswers] = useState<any>({});
  const testId = Number(useParams().testId);
  const token = localStorage.getItem("token");

  const [questions, setQuestions] = useState<string | null>(
    localStorage.getItem("remainingQuestions") === "undefined"
      ? ""
      : localStorage.getItem("remainingQuestions") || "",
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState<any>();
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState(
    Number(localStorage.getItem("difficulty")) || 4,
  );
  const [currentTopicIndex, setCurrentTopicIndex] = useState(
    Number(localStorage.getItem("topicIndex")) || 0,
  );
  const [answers, setAnswers] = useState<any>(
    localStorage.getItem("remainingAnswers") === null
      ? ""
      : JSON.parse(localStorage.getItem("remainingAnswers") || ""),
  );
  const handleGetQuestion = async (
    index?: number,
    difficulty?: number,
    topicIndex?: number,
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/course/get-adaptive-test-question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            test_id: testId,
            difficulty: difficulty ? difficulty : currentDifficulty,
            current_topic_index: topicIndex ? topicIndex : currentTopicIndex,
            userAnswer: userAnswers[currentQuestion],
          }),
        },
      );

      const data = await response.json();
      setAnswers(data.answers);
      setQuestions(data.question);
      setUserAnswers({});
      saveQuestionsToLocalStorage(
        index ? index : 0,
        data.question,
        data.answers,
        data.question_id,
        data.topic,
      );
      loadQuestionsFromLocalStorage();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentQuestion === 0) {
      const { remainingQuestions, currentQuestionId } =
        loadQuestionsFromLocalStorage();
      if (remainingQuestions) {
        const { currentQuestionIndex, remainingQuestions } =
          loadQuestionsFromLocalStorage();
        setCurrentQuestion(currentQuestionIndex);
        setCurrentQuestionId(currentQuestionId);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setQuestions(remainingQuestions);
        setAnsweredQuestions(answeredQuestions);
        return;
      } else handleGetQuestion();
    }
  }, []);

  // useEffect(() => {
  //   const disableDevToolsShortcuts = (event: any) => {
  //     if (
  //       event.key === "F12" ||
  //       (event.ctrlKey &&
  //         event.shiftKey &&
  //         (event.code === "KeyI" ||
  //           event.code === "KeyC" ||
  //           event.code === "KeyJ"))
  //     ) {
  //       alert("Такая функциональность недоступна");
  //       event.preventDefault();
  //     }
  //   };

  //   const disableContextMenu = (event: any) => {
  //     alert("Такая функциональность недоступна");
  //     event.preventDefault();
  //   };

  //   document.addEventListener("keydown", disableDevToolsShortcuts);
  //   document.addEventListener("contextmenu", disableContextMenu);

  //   return () => {
  //     document.removeEventListener("keydown", disableDevToolsShortcuts);
  //     document.removeEventListener("contextmenu", disableContextMenu);
  //   };
  // }, []);
  const handleAnswerChange = (questionIndex: any, answer: any) => {
    setUserAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };
  const [answerId, setAnswerId] = useState<any>();
  const handleNextQuestion = async () => {
    setAnsweredQuestions((prevAnsweredQuestions) => [
      ...prevAnsweredQuestions,
      currentQuestion,
    ]);
    saveAnsweredQuestionsToLocalStorage([
      ...answeredQuestions,
      currentQuestion,
    ]);
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    const questionId = localStorage.getItem("questionId");
    const topicId = localStorage.getItem("topicId");
    const response = await fetch(
      `${BASE_URL}/course/answer-adaptive-test-question`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_question_index: currentQuestion,
          test_id: testId,
          course_id,
          user_id,
          topic_id: Number(topicId),
          answer_id: answerId,
          question_id: Number(questionId),
          currentDifficulty: currentDifficulty,
        }),
      },
    );
    const data = await response.json();
    const nextDifficulty = data.nextDifficulty;
    await setCurrentDifficulty(nextDifficulty);
    if (
      (answeredQuestions.length + 1) % 4 === 0 &&
      answeredQuestions.length + 1 !== 0
    ) {
      handleGetQuestion(currentQuestion + 1, 4, currentTopicIndex + 1);
      setAnswerId(null);
      setCurrentDifficulty(4);
      setCurrentTopicIndex((prev) => prev + 1);
    } else {
      handleGetQuestion(currentQuestion + 1, nextDifficulty);
    }
  };

  return (
    <Flex justify={"space-between"}>
      <Flex gap={10} vertical>
        <span>
          Тема {currentTopicIndex + 1}. {questions}
        </span>
        <TestAnswersStyled>
          <Radio.Group>
            <Flex vertical gap={8}>
              {answers &&
                answers.map((answer: any) => (
                  <RadioStyled
                    onChange={() => setAnswerId(answer.id)}
                    key={answer.id}
                    value={answer.answer_text}
                  >
                    {answer.answer_text}
                  </RadioStyled>
                ))}
            </Flex>
          </Radio.Group>
        </TestAnswersStyled>
      </Flex>
      <Flex gap={8} style={{ maxWidth: "320px" }} wrap={"wrap"}>
        {myArray.map((answer, index) => (
          <AnswerBlock
            key={answer}
            isCurrentQuestion={currentQuestion === index}
            isPreviousQuestion={
              answeredQuestions.includes(index) && currentQuestion !== index
            } // Проверяем, является ли вопрос предыдущим
            userAnswer={userAnswers[index]}
            isAnswered={answeredQuestions.includes(index)}
            onAnswerChange={(answer: any) => handleAnswerChange(index, answer)}
          >
            <span>{answer}</span>
          </AnswerBlock>
        ))}
        {currentQuestion !== 39 && (
          <Button
            onClick={() => handleNextQuestion()}
            text={"Следующий вопрос"}
          />
        )}
        {currentQuestion === 39 && (
          <Button
            style={{ marginTop: "20px" }}
            onClick={() => handleFinish()}
            text={"Закончить тест"}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default AdaptiveTestPassing;
