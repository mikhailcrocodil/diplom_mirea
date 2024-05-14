import React from "react";
import { AuthForm } from "../components/Authorization";
import { AuthStyled } from "./Pages.styled";
import { useTranslation } from "react-i18next";

const AuthPage = () => {
  const { t } = useTranslation();
  return (
    <AuthStyled>
      <h3 style={{ fontWeight: 500 }}>{t("signIn.title")}</h3>
      <AuthForm />
    </AuthStyled>
  );
};

export default AuthPage;
