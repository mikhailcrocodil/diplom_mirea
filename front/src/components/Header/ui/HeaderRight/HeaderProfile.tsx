import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { AvatarBlockStyled } from "./HeaderRight.styled";
import { HeaderDropdown } from "./HeaderDropdown";
import { useGetUser } from "../../../../shared/hooks/useGetUser";

const HeaderProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useGetUser();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AvatarBlockStyled
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        onClick={(e) => handleClick(e)}
      >
        <Avatar
          style={{ width: "40px", height: "40px", background: "#ECE5E5" }}
        >
          {!user?.img || user?.img === "empty" ? (
            <span style={{ color: "#000", fontWeight: 500, fontSize: "14px" }}>
              {user?.surname[0]}.{user?.name[0]}
            </span>
          ) : (
            <img src={user?.img} alt={"Avatar"} />
          )}
        </Avatar>
      </AvatarBlockStyled>
      {open && (
        <HeaderDropdown
          anchorEl={anchorEl}
          handleClose={handleClose}
          isOpen={open}
        />
      )}
    </>
  );
};

export default HeaderProfile;
