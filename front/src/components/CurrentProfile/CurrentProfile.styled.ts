import styled from "styled-components";
import { Avatar } from "@mui/material";

export const ProfileStyled = styled("div")`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AvatarBlock = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  font-size: 32px;
  color: var(--fullname-color);
`;

export const AvatarStyled = styled(Avatar)`
  background-color: var(--avatar-color) !important;
  width: 8.5em !important;
  height: 8.5em !important;
  display: flex;
  align-items: center;
  & > span {
    font-size: 48px;
    color: var(--title-color);
  }
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ButtonsStyled = styled("div")`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const CardsBlock = styled("div")`
  margin: 32px 255px;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 48px 128px;
`;
