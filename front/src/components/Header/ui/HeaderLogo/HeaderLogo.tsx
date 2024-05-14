import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../../../app/routing/libs/routePaths";

const HeaderLogoStyled = styled("span")`
  font-family: "Inter", serif;
  cursor: pointer;
  font-size: 36px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  & a {
    all: unset;
  }
`;

const HeaderLogo = () => {
  const { t } = useTranslation();
  return (
    <HeaderLogoStyled>
      <NavLink to={RoutePath.main}>{t("header.logo")}</NavLink>
    </HeaderLogoStyled>
  );
};

export default HeaderLogo;
