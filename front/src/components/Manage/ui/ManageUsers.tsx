import React from "react";
import { useGetUser } from "../../../shared/hooks/useGetUser";
import { UserRole } from "../../../api/models";
import ErrorMessage from "../../UI/Error/Error";
import { useGetAllUsers } from "../../../api/hooks/user/useGetAllUsers";
import { ManageUsersForm } from "./ManageUsersForm/ManageUsersForm";
import Loading from "../../UI/Loading/Loading";

const ManageUsers = () => {
  const { userRole } = useGetUser();
  const { data: users, refetch } = useGetAllUsers();

  return userRole === UserRole.ADMIN || userRole === undefined ? (
    users ? (
      <ManageUsersForm refetch={refetch} users={users} />
    ) : (
      <Loading />
    )
  ) : (
    <ErrorMessage message={"У вас нет прав на просмотр этой страницы"} />
  );
};

export default ManageUsers;
