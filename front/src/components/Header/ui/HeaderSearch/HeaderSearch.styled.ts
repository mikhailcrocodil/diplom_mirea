import styled from "styled-components";

export const FormStyled = styled.form`
  position: relative;
  min-width: 50%;
  & button {
    position: absolute;
    right: 16px;
    top: 24%;
    cursor: pointer;
    color: var(--title-color);
  }
`;

export const InputStyled = styled.input`
  background: var(--bg-color);
  width: 100%;
  color: var(--title-color);
  border-radius: 25px;
  padding: 12px 48px 12px 32px;
  font-size: 18px;
  border: none;
  &:focus {
    outline-width: 0;
  }
`;
