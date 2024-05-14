import styled from "styled-components";

export const AuthStyled = styled("div")`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
  & > h3 {
    color: var(--title-color);
  }
`;

export const ChatWrapper = styled("div")`
  display: flex;
  gap: 64px;
`;

export const ChatLeftStyled = styled("div")`
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
  height: 85vh;
  padding-right: 50px;
  gap: 20px;
`;
