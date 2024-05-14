import styled from "styled-components";

export const TableHeaderStyled = styled("header")`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  & > div:first-child {
    border-radius: 20px 0 0 0;
  }
  & > div:last-child {
    border-radius: 0 20px 0 0;
  }
`;

type Props = {
  width: number;
};

export const HeaderCell = styled("div")<Props>`
  padding: 16px 0;
  border: 1px solid;
  width: ${(props) => props.width}%;
`;
