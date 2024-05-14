import React from "react";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../../../../../app/routing/libs/routePaths";
import { useLogout } from "../../../../../../api/hooks/user";
import { useGetUser } from "../../../../../../shared/hooks/useGetUser";
import { UserRole } from "../../../../../../api/models";
import {
  adminItems,
  studentItems,
  teacherItems,
} from "../libs/DropdownItems.constants";

type Props = {
  handleClose: () => void;
};

const HeaderDropdownItems = ({ handleClose }: Props) => {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const id = localStorage.getItem("userId");
  const { userRole } = useGetUser();
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <>
      <MenuItem onClick={handleClose}>
        <NavLink to={`${RoutePath.profile}/${id}`}>
          {t("dropdown.profile")}
        </NavLink>
      </MenuItem>
      {userRole === UserRole.ADMIN &&
        adminItems.map((item) => (
          <MenuItem onClick={handleClose} key={item.id}>
            {item.content}
          </MenuItem>
        ))}
      {userRole === UserRole.STUDENT &&
        studentItems.map((item) => (
          <MenuItem onClick={handleClose} key={item.id}>
            {item.content}
          </MenuItem>
        ))}
      {userRole === UserRole.TEACHER &&
        teacherItems.map((item) => (
          <MenuItem onClick={handleClose} key={item.id}>
            {item.content}
          </MenuItem>
        ))}
      <MenuItem
        style={{ borderTop: "1px solid #a6a7a6" }}
        onClick={handleLogout}
      >
        {t("dropdown.logout")}
      </MenuItem>
    </>
  );
};

export default HeaderDropdownItems;
