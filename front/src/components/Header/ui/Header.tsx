import React, { memo } from "react";
import cls from "./Header.module.scss";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderRight from "./HeaderRight/HeaderRight";
const Header = () => {
  return (
    <header className={cls.Header}>
      <div className="container">
        <div className={cls.Header_content}>
          <HeaderLogo />
          <HeaderRight />
        </div>
      </div>
    </header>
  );
};

export const HeaderComponent = memo(Header);
