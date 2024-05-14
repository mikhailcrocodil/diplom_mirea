import { UserModel, UserRole } from "../../../../api/models";
import React, { FC, useState } from "react";
import { Translation, useTranslation } from "react-i18next";

import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {
  user: UserModel;
  setRole: (value: UserRole, id: string, user: any) => void;
};

const menuItems = [
  {
    value: UserRole.ADMIN,
    label: <Translation>{(t) => t("manage.items.admin")}</Translation>,
  },
  {
    value: UserRole.TEACHER,
    label: <Translation>{(t) => t("manage.items.teacher")}</Translation>,
  },
  {
    value: UserRole.STUDENT,
    label: <Translation>{(t) => t("manage.items.student")}</Translation>,
  },
];

export const UserActionMenu: FC<Props> = ({ user, setRole }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        style={{ fontWeight: 700, fontSize: 14, position: "relative" }}
        variant={"text"}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t("manage.set_role")}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => {
              handleClose();
              setRole(item.value, user.id, user);
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
