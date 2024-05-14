import React from "react";
import { Theme, useTheme } from "../../utils/theme";
// eslint-disable-next-line import/no-extraneous-dependencies
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import styled from "styled-components";

const ThemeWrapper = styled.div`
  padding: 8px;
  width: fit-content;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  align-items: center;
  background: #000000;
  transition: 0.3s all;
  & svg {
    transition: 0.3s all;
    color: #ffffff;
  }
  &:hover {
    & svg {
      color: #000;
    }
    background: #ece5e5;
  }
`;
const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <ThemeWrapper onClick={toggleTheme}>
      {theme === Theme.LIGHT ? (
        <SunOutlined />
      ) : (
        <MoonOutlined color={"#000"} />
      )}
    </ThemeWrapper>
  );
};

export default ThemeSwitcher;
