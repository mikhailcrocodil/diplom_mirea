import React, { FC, ReactNode } from "react";
import { Checkbox } from "antd";
import { CellStyled } from "./TableCell.styled";

type Props = {
  width: number;
  cell: any;
};

export const TableCell: FC<Props> = ({ cell, width }) => {
  const displayValue =
    typeof cell !== "object" || React.isValidElement(cell)
      ? cell
      : JSON.stringify(cell);
  return (
    <CellStyled width={width}>
      {typeof displayValue !== "boolean" ? (
        displayValue !== "null" ? (
          displayValue
        ) : (
          ""
        )
      ) : (
        <Checkbox style={{ fontSize: 24 }} defaultChecked={displayValue} />
      )}
    </CellStyled>
  );
};
