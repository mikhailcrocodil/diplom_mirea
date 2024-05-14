import { FC, ReactNode } from "react";
import { TableCell } from "../Table-cell/TableCell";
import { RowStyled } from "./TableRow.styled";

type Props = {
  content: any[];
  children?: ReactNode;
};
export const TableRow: FC<Props> = ({ content, children }) => {
  console.log(content);
  return (
    <RowStyled>
      {children}
      {Object.entries(content).map(([key, value]) => (
        <TableCell
          key={key}
          cell={value}
          width={100 / (Object.keys(content).length + 0.5)}
        />
      ))}
    </RowStyled>
  );
};
