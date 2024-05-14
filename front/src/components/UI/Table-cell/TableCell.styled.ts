import styled from "styled-components";

type Props = {
  width: number;
};

export const CellStyled = styled("div")<Props>`
  display: flex;

  padding: 8px 12px;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  border: 1px solid;
  overflow: clip;
  word-wrap: break-word;
  width: ${(props) => props.width + 5}%;
`;
