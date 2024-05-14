import styled from "styled-components";
import { Checkbox, Radio } from "antd";

export const LeftPartStyled = styled("div")`
  position: sticky;
  height: fit-content;
  top: 32px;
`;

export const TestWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: start;
`;

export const TestQuestionStyled = styled("div")`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

export const TestAnswersStyled = styled("ul")`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TestAnswerStyled = styled("li")`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-left: 32px;
`;

export const CheckboxStyled = styled(Checkbox)`
  color: var(--primary-color);
  font-size: 16px !important;
`;

export const RadioStyled = styled(Radio)`
  color: var(--primary-color);
  font-size: 20px !important;
`;
