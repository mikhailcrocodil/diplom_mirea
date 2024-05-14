import styled from "styled-components";

export const AuthFormStyled = styled("form")`
  width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputsStyled = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const FirstRow = styled("div")`
  display: flex;
  gap: 8px;
  width: 150%;
`;

export const AuthErrorStyled = styled("span")`
  color: red;
  font-size: 14px;
`;
