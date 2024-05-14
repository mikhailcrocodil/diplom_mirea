import React, { FC, useEffect, useState } from "react";
import {
  InputPatronymic,
  InputsStyled,
  ProfileFormStyled,
} from "./ProfileForm.styled";
import { ProfileType } from "../libs/yup/profile.scheme";
import { FileUpload } from "../../../../shared/UI/FileUploader/FileUpload";
import { Input } from "../../../UI/Input/Input";
import { UserModel } from "../../../../api/models";
import { Flex, Switch } from "antd";

type Props = {
  currentUser: UserModel;
  control: any;
  handleSubmit: any;
  setValue: any;
  submitForm: any;
  setImg: any;
  img: string;
};

export const ProfileForm: FC<Props> = ({
  currentUser,
  control,
  handleSubmit,
  setValue,
  submitForm,
  img,
  setImg,
}) => {
  const [isToggle, setIsToggle] = useState(false);
  console.log(currentUser);
  const toggle = (e: boolean) => {
    setIsToggle(e);
  };
  const setImage = (value: any) => {
    setImg(value);
  };

  useEffect(() => {
    if (img) {
      setValue("img", img);
    }
  }, [img, setValue]);

  return (
    <ProfileFormStyled onSubmit={handleSubmit(submitForm)}>
      <div>
        <FileUpload img={img} setValue={(value) => setImage(value)} />
      </div>
      <InputsStyled>
        <Flex justify="center" gap={32}>
          <Input<ProfileType>
            control={control}
            defaultValue={currentUser.name}
            name={"name"}
            type={"text"}
            label={"Введите имя"}
            variant={"outlined"}
          />
          <Input<ProfileType>
            control={control}
            defaultValue={currentUser.surname}
            name={"surname"}
            type={"text"}
            label={"Введите фамилию"}
            variant={"outlined"}
          />
        </Flex>
        <InputPatronymic>
          <Input<ProfileType>
            control={control}
            defaultValue={currentUser.patronymic}
            name={"patronymic"}
            type={"text"}
            label={"Введите отчество (при наличии)"}
            variant={"outlined"}
          />
        </InputPatronymic>
        <InputPatronymic>
          <Input<ProfileType>
            control={control}
            defaultValue={currentUser.email}
            name={"email"}
            type={"email"}
            label={"Введите email"}
            variant={"outlined"}
          />
        </InputPatronymic>
        {isToggle && (
          <Flex style={{ marginTop: 16 }} justify="center" gap={32}>
            <Input<ProfileType>
              control={control}
              name={"password"}
              type={"password"}
              label={"Введите пароль"}
              variant={"outlined"}
            />
            <Input<ProfileType>
              control={control}
              name={"confirmPassword"}
              type={"password"}
              label={"Подтвердите пароль"}
              variant={"outlined"}
            />
          </Flex>
        )}
        <Flex style={{ marginTop: 8 }} gap={8} align={"center"}>
          <span style={{ fontSize: "16px", fontWeight: 500 }}>
            Поменять пароль?
          </span>
          <Switch onChange={toggle} defaultChecked={isToggle} />
        </Flex>
      </InputsStyled>
    </ProfileFormStyled>
  );
};
