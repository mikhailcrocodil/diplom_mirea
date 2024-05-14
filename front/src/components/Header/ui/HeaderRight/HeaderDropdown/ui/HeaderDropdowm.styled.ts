import styled from "styled-components";
import { Menu } from "@mui/material";

export const MenuStyled = styled(Menu)`
  & .MuiMenu-paper {
    width: 18em;
    margin-top: 8px;
  }
  & .MuiButtonBase-root {
    font-family: var(--font-family-main);
    font-weight: 500;
  }
  & a {
    all: unset;
    width: 100%;
  }
`;
