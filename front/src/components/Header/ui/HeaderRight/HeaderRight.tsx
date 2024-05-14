import React from "react";
import ThemeSwitcher from "../../../../shared/ThemeSwitcher/ThemeSwitcher";
import HeaderProfile from "./HeaderProfile";
import styled from "styled-components";
import { Chat } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../../../app/routing/libs/routePaths";

const HeaderRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  & a {
    all: unset;
    width: 22px;
    height: 22px;
  }
`;

const ChatStyled = styled(Chat)`
  cursor: pointer;
`;

const HeaderRight = () => {
  return (
    <HeaderRightWrapper>
      <HeaderProfile />
      <ThemeSwitcher />
      <NavLink
        className={({ isActive }) => (isActive ? "link__active" : "link__not")}
        to={RoutePath.chat}
      >
        <ChatStyled />
      </NavLink>
    </HeaderRightWrapper>
  );
};

export default HeaderRight;
