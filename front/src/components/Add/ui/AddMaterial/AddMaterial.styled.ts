import styled from "styled-components";
import { DatePicker, Input } from "antd";
const { TextArea } = Input;

export const AddMaterialStyled = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  & > h2 {
    font-weight: 600;
  }
  & > button {
    width: fit-content;
  }
`;

export const FormWrapper = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextAreaStyled = styled(TextArea)`
  background: var(--bg-color);
  font-size: 18px;
  min-height: 140px !important;
  color: var(--primary-color);
  border: 1px solid gray;
  &:hover {
    background: var(--bg-color);
    border: 1px solid gray;
    color: var(--primary-color);
  }
  &:focus {
    background: var(--bg-color);
    color: var(--primary-color);
    border: 1px solid gray;
  }
  &::placeholder {
    color: var(--primary-color);
    font-size: 18px;
  }
`;

export const InputStyled = styled(Input)`
  background: var(--bg-color);
  font-size: 18px;
  color: var(--primary-color);
  border: 1px solid gray;
  &:hover {
    background: var(--bg-color);
    border: 1px solid gray;
    color: var(--primary-color);
  }
  &:focus {
    background: var(--bg-color);
    color: var(--primary-color);
    border: 1px solid gray;
  }
  &::placeholder {
    color: var(--primary-color);
    font-size: 18px;
  }
`;

export const DatePickerStyled = styled(DatePicker)`
  background: var(--bg-color) !important;
  font-size: 18px;
  color: var(--primary-color) !important;
  border: 1px solid var(--border-color);
  & svg[data-icon="calendar"],
  & input::placeholder {
    color: var(--primary-color) !important;
    fill: var(--primary-color) !important;
  }
  & .ant-picker-input-placeholder > input::placeholder {
    color: var(--primary-color) !important;
    fill: var(--primary-color) !important;
  }
  & .ant-picker-focused {
    background: var(--bg-color) !important;
    border: 1px solid var(--border-color) !important;
    color: var(--primary-color) !important;
    fill: var(--primary-color) !important;
  }
  &:hover {
    background: var(--bg-color) !important;
    border: 1px solid var(--border-color) !important;
    color: var(--primary-color) !important;
  }
  &:focus {
    background: var(--bg-color) !important;
    color: var(--primary-color) !important;
    border: 1px solid var(--border-color) !important;
  }
`;
