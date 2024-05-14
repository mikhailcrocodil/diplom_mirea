import { useGetUser } from "../../shared/hooks/useGetUser";
import Loading from "../UI/Loading/Loading";
import {
  AvatarBlock,
  AvatarStyled,
  ButtonsStyled,
  CardsBlock,
  ProfileStyled,
} from "./CurrentProfile.styled";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { NavLink, useParams } from "react-router-dom";
import { UsersRoles } from "../../shared/constants/users.enums";
import { Button } from "../../components/UI/Button";
import CardComponent from "../UI/Card/Card";
import ProfileCardUser from "./ProfileCard/ProfileCardUser";
import React, { useEffect, useState } from "react";
import { Modal } from "../UI/Modal";
import { useTranslation } from "react-i18next";
import { ProfileForm } from "./ProfileForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  profileEditScheme,
  ProfileType,
} from "./ProfileForm/libs/yup/profile.scheme";
import { useEdit } from "../../api/hooks/user/useEdit";
import useToast from "../../shared/UI/Toast/useToast";
import { UserModel, UserRole } from "../../api/models";
import { useGetCurrentUser } from "../../api/hooks/user";
import ErrorMessage from "../UI/Error/Error";
import { CardUser, InfoBlock } from "./ProfileCard/ProfileCard.styled";
import { useGetCourses } from "../../api/hooks/course/useGetCourses";
import { Flex } from "antd";
import { useGetAllUsers } from "../../api/hooks/user/useGetAllUsers";
import { RoutePath } from "../../app/routing/libs/routePaths";

const CurrentProfile = () => {
  const params = useParams().profile_id;
  const [isModal, setIsModal] = useState(false);
  const { userId } = useLocalStorage();
  const { courses } = useGetCourses();
  const { user: myProfile, setFullName, userRole } = useGetUser();
  const { data: allUsers } = useGetAllUsers();
  const isMyProfile = params === userId;
  const { t } = useTranslation();
  const { editMutation, isSuccess } = useEdit();
  const { getCurrentUserMutation, data, isError } = useGetCurrentUser();
  const openNotification = useToast();
  const [user, setUser] = useState<UserModel | null | undefined>(myProfile);

  useEffect(() => {
    if (!isMyProfile && params) {
      getCurrentUserMutation({ id: params });
    }
  }, [params, isMyProfile, getCurrentUserMutation]);

  useEffect(() => {
    if (myProfile && isMyProfile) setUser(myProfile);
    if (!isMyProfile && data) setUser(data);
  }, [myProfile, data, isMyProfile]);

  const handleOpen = () => setIsModal(true);
  const handleClose = () => setIsModal(false);
  const [img, setImg] = useState<string>("");

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(profileEditScheme),
    mode: "onSubmit",
  });

  const submitForm = async (data: ProfileType) => {
    const dataToRequest = {
      login: data.login || user?.login,
      email: data.email || user?.email,
      name: data.name || user?.name,
      surname: data.surname || user?.surname,
      patronymic: data.patronymic,
      img: img || user?.img || "",
    };
    editMutation(dataToRequest);
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      openNotification({
        type: "success",
        message: "Данные пользователя успешно обновлены",
      });
    }
  }, [isSuccess]);

  return user ? (
    user.access ? (
      <ProfileStyled>
        <AvatarBlock>
          <AvatarStyled>
            {!user.img || user.img === "empty" ? (
              <span>
                {user.surname[0]}.{user.name[0]}
              </span>
            ) : (
              <img src={user.img} alt={"Avatar"} />
            )}
          </AvatarStyled>
          <span>
            {setFullName(user)} ({user.role && UsersRoles[user.role]})
          </span>
          <ButtonsStyled>
            {(isMyProfile || userRole === UserRole.ADMIN) && (
              <Button onClick={handleOpen} text={t("profile.edit")} />
            )}
          </ButtonsStyled>
        </AvatarBlock>
        <CardsBlock>
          <CardComponent headerTitle={t("profile.user_info")}>
            <ProfileCardUser
              city={user.city}
              date_registration={user.date_registration}
              country={user.country}
              timezone={user.timezone}
              email={user.email}
            />
          </CardComponent>
          {user.role === UserRole.ADMIN && (
            <CardComponent headerTitle={t("profile.common")}>
              <CardUser>
                <InfoBlock>
                  <span>{t("profile.courses")}: </span>
                  <Flex vertical gap={8} style={{ marginTop: 4 }}>
                    {courses?.map((course) => (
                      <NavLink
                        to={`${RoutePath.all_courses}/${course.id}`}
                        key={course.id}
                      >
                        {course.title}
                      </NavLink>
                    ))}
                  </Flex>
                </InfoBlock>
                <InfoBlock>
                  <span>{t("profile.users")}: </span>
                  <Flex vertical gap={8} style={{ marginTop: 4 }}>
                    {allUsers &&
                      allUsers.map((user) => (
                        <NavLink
                          to={`${RoutePath.profile}/${user.id}`}
                          key={user.id}
                        >
                          {setFullName(user)} -{" "}
                          {UsersRoles[user.role || UserRole.ADMIN]}
                        </NavLink>
                      ))}
                  </Flex>
                </InfoBlock>
              </CardUser>
            </CardComponent>
          )}
        </CardsBlock>
        {isModal && (
          <Modal
            okText={t("buttons.edit")}
            cancelText={t("buttons.cancel")}
            title={t("modal.title.edit_profile")}
            open={isModal}
            handleOk={handleSubmit(submitForm)}
            handleCancel={handleClose}
          >
            <ProfileForm
              img={user?.img || img}
              setImg={setImg}
              submitForm={submitForm}
              control={control}
              handleSubmit={handleSubmit}
              setValue={setValue}
              currentUser={user}
            />
          </Modal>
        )}
      </ProfileStyled>
    ) : (
      <ErrorMessage message={t("errors.not_confirm")} />
    )
  ) : isError ? (
    <ErrorMessage message={t("errors.user_not_found")} />
  ) : (
    <Loading />
  );
};

export default CurrentProfile;
