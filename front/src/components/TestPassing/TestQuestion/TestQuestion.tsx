import { QuestionModel } from "../../../api/models";
import { FC } from "react";
import { TestAnswer } from "../TestAnswer/TestAnswer";
import { TestAnswersStyled, TestQuestionStyled } from "../TestPassing.styled";
import { Radio } from "antd";

type Props = {
  question: QuestionModel;
  index: number;
  handleAnswer: (answer: any) => void;
};

export const TestQuestion: FC<Props> = ({ question, index, handleAnswer }) => {
  const setAnswer = (answer: string, id: number) => {
    const answ = {
      answer_text: answer,
      question_id: question.question.id,
      answer_id: id,
    };
    handleAnswer(answ);
  };

  return (
    <TestQuestionStyled>
      <span>
        {index}. {question.question.question_text}
      </span>
      <TestAnswersStyled>
        <Radio.Group>
          {question.answers.map((question) => (
            <TestAnswer
              handleAnswer={(answer, id) => setAnswer(answer, id)}
              key={question.id}
              answer={question}
            />
          ))}
        </Radio.Group>
      </TestAnswersStyled>
    </TestQuestionStyled>
  );
};
