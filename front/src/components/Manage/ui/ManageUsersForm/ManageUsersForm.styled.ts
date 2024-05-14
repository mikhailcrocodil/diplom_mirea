import { IconButton } from "@mui/material";
import styled from "styled-components";

export {};
export const IconButtonStyled = styled(IconButton)`
  & > svg {
    color: var(--button-color);
  }
`;
