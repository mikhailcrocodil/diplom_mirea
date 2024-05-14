import { FC } from "react";
import { HeaderCell, TableHeaderStyled } from "./TableHeader.styled";
import { CellStyled } from "../Table-cell/TableCell.styled";

type Props = {
  headerWords: string[];
};

export const TableHeader: FC<Props> = ({ headerWords }) => {
  const width = 80 / headerWords.length;
  return (
    <TableHeaderStyled>
      {headerWords.map((cell, index) => (
        <CellStyled width={width} key={index}>
          {cell}
        </CellStyled>
      ))}
    </TableHeaderStyled>
  );
};
