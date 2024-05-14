import styled from "styled-components";

type Props = {
  isCollapsed: boolean;
  maxWidth?: string | number;
};

export const CardStyled = styled("div")<Props>`
  padding: 12px 20px;
  background: var(--bg-color);
  border: 1px solid var(--border-card-color);
  font-size: 18px;
  font-weight: 500;
  min-width: 495px;
  max-width: ${(props) => props.maxWidth}%;
  transition: 0.3s ease-out;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardContent = styled("div")<{ isCollapsed: boolean }>`
  word-wrap: break-word;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  max-height: ${(props) => (props.isCollapsed ? "0" : "1500px")};
`;

export const CardHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  color: var(--title-color);
  font-size: 24px;
  cursor: pointer;
  font-weight: 700;
`;

export const ExpandStyled = styled("div")<Props>`
  width: 25px;
  height: 25px;
  transition: 0.3s all;
  transform: ${(props) => (props.isCollapsed ? "rotate(180deg)" : "rotate(0)")};
  & > svg {
    width: 100%;
    height: 100%;
  }
`;
