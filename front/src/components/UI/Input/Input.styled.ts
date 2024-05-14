import styled from "styled-components";
import { TextField } from "@mui/material";

type Props = {
  theme: "light" | "dark";
};

export const InputStyled = styled(TextField)<Props>`
  background: var(--bg-color);
  border-radius: 5px;
  .MuiInputBase-input {
    color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
  }
  .Mui-focused {
    border: none !important;
  }
  & > label {
    color: var(--label-color);
  }
  & > input {
    color: var(--title-color);
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) =>
      props.theme === "light" ? "#212121" : "#d3d1d1"} !important;
  }
`;
