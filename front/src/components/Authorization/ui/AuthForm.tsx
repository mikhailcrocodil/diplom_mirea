import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthType, authScheme } from "../libs/yup/auth.scheme";
import { Input } from "../../UI/Input/Input";
import {
  AuthErrorStyled,
  AuthFormStyled,
  FirstRow,
  InputsStyled,
} from "./AuthForm.styled";
import { Button } from "../../UI/Button";
import { useTranslation } from "react-i18next";
import { useSignIn } from "../../../api/hooks/user";
import { RoutePath } from "../../../app/routing/libs/routePaths";
import { useNavigate } from "react-router-dom";
import { Flex } from "antd";
import useToast from "../../../shared/UI/Toast/useToast";

export const AuthForm = () => {
  const { t } = useTranslation();
  const { signInMutation, isLoading, error } = useSignIn();
  const [msg, setMsg] = useState<string>();
  const navigate = useNavigate();
  const openNotification = useToast();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(authScheme),
    mode: "onSubmit",
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error?.response?.status === 403) {
      reset();
      setMsg("");
      openNotification({
        type: "error",
        message: "Ваш профиль не подтвержден, свяжитесь с администратором",
      });
    }
  }, [error]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error?.response && error?.response?.status !== 403) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMsg(error.response.data.msg);
    }
  }, [error]);

  const submitForm = async (data: AuthType) => {
    const { value, password } = data;
    signInMutation({ value, password });
  };

  return (
    <AuthFormStyled onSubmit={handleSubmit(submitForm)}>
      <InputsStyled>
        <Input<AuthType>
          control={control}
          name={"value"}
          type={"text"}
          label={t("signIn.email_login")}
          variant={"outlined"}
        />
        <Input<AuthType>
          control={control}
          name={"password"}
          type={"password"}
          label={t("signIn.password")}
          variant={"outlined"}
        />
        {msg && <AuthErrorStyled>{msg}</AuthErrorStyled>}
        <Flex gap={32}>
          <Button
            style={{ width: "40%", borderRadius: "18px", fontSize: "16px" }}
            text={t("auth.button_auth")}
            type={"submit"}
            disabled={isLoading}
          />
          <Button
            onClick={() => navigate(RoutePath.registration)}
            style={{ width: "60%", borderRadius: "18px", fontSize: "14px" }}
            text={t("signIn.button_registration")}
            type={"button"}
          />
        </Flex>
      </InputsStyled>
    </AuthFormStyled>
  );
};
