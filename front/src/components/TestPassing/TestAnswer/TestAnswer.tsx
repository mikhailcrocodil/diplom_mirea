import { TAnswer } from "../../../api/models";
import { FC } from "react";
import { RadioStyled, TestAnswerStyled } from "../TestPassing.styled";

type Props = {
  answer: TAnswer;
  handleAnswer: (value: any, id: number) => void;
};

export const TestAnswer: FC<Props> = ({ answer, handleAnswer }) => {
  return (
    <TestAnswerStyled>
      <RadioStyled
        value={answer.answer_text}
        onChange={() => handleAnswer(answer.answer_text, answer.id)}
      >
        {answer.answer_text}
      </RadioStyled>
    </TestAnswerStyled>
  );
};
