import { Flex, Tooltip } from "antd";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { MenuItems } from "./menuItems";
import styled from "styled-components";
import ru from "../../../utils/icons/flags/ru.svg";
import { useTranslation } from "react-i18next";

export const MenuItemStyled = styled(MenuItem)`
  display: flex;
  align-items: center;
  & > img {
    width: 40px;
    height: 40px;
  }
`;

export const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setI18Lang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Box>
      <Tooltip title="Выбор языка">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 60, height: 60 }}>
            <img
              style={{ width: "32px", height: "32px", borderRadius: 10 }}
              src={ru}
            />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <Flex vertical gap={8}>
          {MenuItems.map((item) => (
            <MenuItemStyled
              onClick={() => setI18Lang(item.value)}
              key={item.value}
            >
              <img src={item.src} />
            </MenuItemStyled>
          ))}
        </Flex>
      </Menu>
    </Box>
  );
};
