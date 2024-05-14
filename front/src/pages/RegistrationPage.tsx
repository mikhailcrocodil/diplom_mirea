import React from "react";
import { AuthStyled } from "./Pages.styled";
import { useTranslation } from "react-i18next";
import { RegistrationForm } from "../components/Registration";

const RegistrationPage = () => {
  const { t } = useTranslation();
  return (
    <AuthStyled>
      <h3 style={{ fontWeight: 500 }}>{t("signUp.title")}</h3>
      <RegistrationForm />
    </AuthStyled>
  );
};

export default RegistrationPage;
