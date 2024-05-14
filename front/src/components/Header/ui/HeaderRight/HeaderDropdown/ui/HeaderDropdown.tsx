import React from "react";
import { MenuStyled } from "./HeaderDropdowm.styled";
import HeaderDropdownItems from "./HeaderDropdownItems";
type Props = {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
};

export const HeaderDropdown = ({ handleClose, anchorEl, isOpen }: Props) => {
  return (
    <MenuStyled
      id="basic-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <HeaderDropdownItems handleClose={handleClose} />
    </MenuStyled>
  );
};
