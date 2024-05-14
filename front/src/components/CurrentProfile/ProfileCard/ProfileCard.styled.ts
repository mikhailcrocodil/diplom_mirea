import styled from "styled-components";

export const CardUser = styled("div")`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 16px;
`;

export const InfoBlock = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: 500;
  font-size: 18px;
  & > span:first-child {
    font-weight: 700;
  }
`;
