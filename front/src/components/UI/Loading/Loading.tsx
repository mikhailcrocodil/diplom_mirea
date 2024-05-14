import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingStyled } from "./Loading.styled";

const Loading = () => {
  return (
    <LoadingStyled>
      <CircularProgress />
    </LoadingStyled>
  );
};

export default Loading;
