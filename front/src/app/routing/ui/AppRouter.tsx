import { routeConfigPrivate, routeConfigPublic } from "../libs/routeConfig";
import { useRoutes } from "react-router-dom";
import React, { Suspense } from "react";
import { useTheme } from "../../../utils/theme";
import { classNames } from "../../../utils/classNames/classNames";
import { HeaderComponent } from "../../../components/Header";
import { QUERY_KEY } from "../../../shared/constants/query.keys";
import { useQuery } from "react-query";
import ThemeSwitcher from "../../../shared/ThemeSwitcher/ThemeSwitcher";
import styled from "styled-components";
import { SuspenseLoader } from "../../../components/UI/SuspenseLoader/SuspenseLoader";

function RoutesFunctionPrivate() {
  return useRoutes(routeConfigPrivate);
}

function RoutesFunctionPublic() {
  return useRoutes(routeConfigPublic);
}

const ThemeSwitcherBlock = styled("div")`
  position: absolute;
  bottom: 40px;
  left: 24px;
  & > div:first-child {
    background: var(--bg-color);
  }
  & svg {
    color: var(--title-color) !important;
  }
`;

const LanguageSwitcherBlock = styled("div")`
  position: absolute;
  bottom: 40px;
  right: 64px;
  & .MuiTouchRipple-root,
  .MuiAvatar-root {
    color: #fff;
    background: var(--switcher-color);
  }
  & svg {
    color: var(--title-color) !important;
  }
`;

const Layout = ({
  children,
  isAuth,
}: {
  children: React.ReactNode;
  isAuth: boolean;
}) => {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      {isAuth && <HeaderComponent />}
      {/*<LanguageSwitcherBlock>*/}
      {/*  <LanguageSwitcher />*/}
      {/*</LanguageSwitcherBlock>*/}
      <div className="container">
        <ThemeSwitcherBlock>{!isAuth && <ThemeSwitcher />}</ThemeSwitcherBlock>
        {children}
      </div>
    </div>
  );
};

const AppRouter = () => {
  const { data } = useQuery(QUERY_KEY.TOKEN);
  const token = String(data);
  const isAuth = Boolean(localStorage.getItem(QUERY_KEY.IS_AUTH));
  const _isAuth = isAuth || token !== "undefined";

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Layout isAuth={_isAuth}>
        {_isAuth ? <RoutesFunctionPrivate /> : <RoutesFunctionPublic />}
      </Layout>
    </Suspense>
  );
};

export default AppRouter;
