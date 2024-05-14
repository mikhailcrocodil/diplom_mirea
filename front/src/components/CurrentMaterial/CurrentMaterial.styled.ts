import styled from "styled-components";

export const MaterialWrapper = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
  & > h2 {
    font-weight: 600;
  }
`;

export const TextContent = styled("div")`
  white-space: pre-wrap;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  text-indent: 30px;
  letter-spacing: 0.5px;
  & > span {
    font-weight: 450;
  }
  & > h2,
  h3 {
    margin-bottom: 16px;
  }
`;
