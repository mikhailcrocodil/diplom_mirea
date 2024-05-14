import React from "react";
import { ButtonStyled } from "./Button.styled";
import { ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  text: string;
  onClick?: () => void;
}

export const ButtonComponent = ({
  text,
  style,
  disabled,
  onClick,
  size = "medium",
  variant = "contained",
  type = "button",
}: Props) => {
  return (
    <ButtonStyled
      style={style}
      disabled={disabled}
      size={size}
      variant={variant}
      type={type}
      onClick={onClick}
    >
      {text}
    </ButtonStyled>
  );
};
