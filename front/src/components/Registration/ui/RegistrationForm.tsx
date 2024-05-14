import React, { useEffect, useState } from "react";
import { RegistrationWrapper } from "./RegistrationForm.styled";
import { Input } from "../../UI/Input/Input";
import {
  AuthErrorStyled,
  FirstRow,
  InputsStyled,
} from "../../Authorization/ui/AuthForm.styled";
import { Button } from "../../UI/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {
  registrationScheme,
  RegistrationType,
} from "../libs/yup/registration.scheme";
import { FileUpload } from "../../../shared/UI/FileUploader/FileUpload";
import { useSignUp } from "../../../api/hooks/user/useSignUp";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../app/routing/libs/routePaths";
import { Flex } from "antd";
import useToast from "../../../shared/UI/Toast/useToast";

export const RegistrationForm = () => {
  const { t } = useTranslation();
  const [img, setImg] = useState<string>("");
  const [msg, setMsg] = useState();
  const { signUpMutation, isSuccess, data, error } = useSignUp();
  const navigate = useNavigate();
  const openNotification = useToast();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registrationScheme),
    mode: "onSubmit",
  });

  const setImage = (value: any) => {
    setImg(value);
  };
  const submitForm = async (data: RegistrationType) => {
    signUpMutation({ ...data, img });
  };

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMsg(error.response.data.msg);
    }
    if (isSuccess) {
      openNotification({
        message:
          "Вы сможете войти в систему после подтверждения аккаунта администратором",
        type: "success",
      });
      navigate(RoutePath.auth);
    }
  }, [data, error, isSuccess]);

  return (
    <RegistrationWrapper onSubmit={handleSubmit(submitForm)}>
      <InputsStyled>
        <div>
          <FileUpload img={img} setValue={(value) => setImage(value)} />
        </div>
        <FirstRow>
          <Input<RegistrationType>
            control={control}
            name={"name"}
            type={"text"}
            label={t("signUp.name")}
            variant={"outlined"}
          />
          <Input<RegistrationType>
            control={control}
            name={"surname"}
            type={"text"}
            label={t("signUp.surname")}
            variant={"outlined"}
          />
          <Input<RegistrationType>
            control={control}
            name={"patronymic"}
            type={"text"}
            label={t("signUp.patronymic")}
            variant={"outlined"}
          />
        </FirstRow>
        <FirstRow>
          <Input<RegistrationType>
            control={control}
            name={"password"}
            type={"password"}
            label={t("signUp.password")}
            variant={"outlined"}
          />
          <Input<RegistrationType>
            control={control}
            name={"confirmPassword"}
            type={"password"}
            label={t("signUp.confirm_password")}
            variant={"outlined"}
          />
        </FirstRow>
        <Input<RegistrationType>
          control={control}
          name={"login"}
          type={"text"}
          label={t("signUp.login")}
          variant={"outlined"}
        />
        <Input<RegistrationType>
          control={control}
          name={"email"}
          type={"text"}
          label={t("signUp.email")}
          variant={"outlined"}
        />
        {msg && <AuthErrorStyled>{msg}</AuthErrorStyled>}
        <Flex gap={32}>
          <Button
            style={{ width: "80%", borderRadius: "18px", fontSize: "14px" }}
            text={t("signUp.button_done")}
            type={"submit"}
          />
          <Button
            onClick={() => navigate(RoutePath.auth)}
            style={{ width: "60%", borderRadius: "18px", fontSize: "14px" }}
            text={t("signUp.button_auth")}
            type={"button"}
          />
        </Flex>
      </InputsStyled>
    </RegistrationWrapper>
  );
};
