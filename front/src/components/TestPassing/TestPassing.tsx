import { useNavigate, useParams } from "react-router-dom";
import { useGetTest } from "../../api/hooks/course/useGetTest";
import { TestQuestion } from "./TestQuestion/TestQuestion";
import { LeftPartStyled, TestWrapper } from "./TestPassing.styled";
import { Flex } from "antd";
import Timer from "../UI/Timer/Timer";
import { Button } from "../UI/Button";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useSubmitAttempt } from "../../api/hooks/course/useSubmitAttempt";

const TestPassing = () => {
  const material_id = useParams().material_id;
  const { addAttemptMutation } = useSubmitAttempt();
  const { data: test } = useGetTest(material_id);
  const [allAnswers, setAllAnswers] = useState<any[]>([]);
  const attemptId = localStorage.getItem("attemptId");
  const navigate = useNavigate();
  const handleSubmit = () => {
    addAttemptMutation({ attempt_id: Number(attemptId), data: allAnswers });
    navigate(`/courses/material/test/${material_id}`);
  };

  const handleAnswer = (answer: any) => {
    const answerIndex = allAnswers.findIndex(
      (_answer) => _answer.question_id === answer.question_id,
    );

    if (answerIndex >= 0) {
      if (allAnswers[answerIndex].answer_text !== answer.answer_text) {
        const newAnswers = [...allAnswers];
        newAnswers[answerIndex] = answer;
        setAllAnswers(newAnswers);
      }
    } else {
      const isDuplicateText = allAnswers.some(
        (_answer) => _answer.answer_text === answer.answer_text,
      );

      if (!isDuplicateText) {
        setAllAnswers([...allAnswers, answer]);
      }
    }
  };

  useEffect(() => {
    console.log(allAnswers);
  }, [allAnswers]);

  return (
    <Flex gap={200}>
      {test?.test[0] && (
        <LeftPartStyled>
          <Flex vertical gap={16}>
            <span style={{ textAlign: "center" }}>
              Оставшееся время
              <br /> <Timer duration={test?.test[0].duration} />
            </span>
            <Button onClick={handleSubmit} text={"Завершить попытку"} />
          </Flex>
        </LeftPartStyled>
      )}
      <TestWrapper>
        {test?.questions.map((question, index) => (
          <TestQuestion
            handleAnswer={handleAnswer}
            index={index + 1}
            key={question.question.id}
            question={question}
          />
        ))}
      </TestWrapper>
    </Flex>
  );
};

export default TestPassing;
