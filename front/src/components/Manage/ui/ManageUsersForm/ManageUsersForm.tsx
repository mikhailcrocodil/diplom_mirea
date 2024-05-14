import { UserModel, UserRole } from "../../../../api/models";
import React, { FC, useEffect, useState } from "react";
import { TableRow } from "../../../UI/Table-row/TableRow";
import { TableHeader } from "../../../UI/Table-header/TableHeader";
import { Checkbox } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteUser } from "../../../../api/hooks/user/useDeleteUser";
import useToast from "../../../../shared/UI/Toast/useToast";
import { useGrantAccess } from "../../../../api/hooks/user/useGrantAccess";
import { useGetUser } from "../../../../shared/hooks/useGetUser";
import { useSetUserRole } from "../../../../api/hooks/user/useSetUserRole";
import { IconButtonStyled } from "./ManageUsersForm.styled";
import { useTranslation } from "react-i18next";
import { UserActionMenu } from "./UserActionMenu";
import axios from "axios";
import { BASE_URL } from "../../../../api/config/config";

type Props = {
  users: UserModel[];
  refetch: () => void;
};

export const ManageUsersForm: FC<Props> = ({ users, refetch }) => {
  const { t } = useTranslation();
  const { data: dataRole, isSuccess: successRole } = useSetUserRole();
  const { getDeleteUser, isSuccess, data } = useDeleteUser();
  const { user: myProfile } = useGetUser();
  const {
    getGrantAccess,
    isSuccess: successGrant,
    data: dataGrant,
  } = useGrantAccess();
  const openNotification = useToast();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  async function setUserRole(id: string, role: string) {
    const token = localStorage.getItem("token");
    const requestId = Number(id);
    const response = await axios.post(
      `${BASE_URL}/user/set-role`,
      {
        id: requestId,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }

  const setRole = async (value: UserRole, id: string, user: any) => {
    const res = await setUserRole(id, value);
    if (res.status === 200) {
      setAnchorEl(null);
      openNotification({
        type: "success",
        message: t("toasts.manage.user.set_role_scs"),
      });
      refetch();
    }
  };

  const deleteUser = (id: string) => {
    getDeleteUser({ id });
  };

  const setAccess = (e: boolean, id: string) => {
    getGrantAccess({ id, access: e });
  };

  useEffect(() => {
    if (isSuccess && data) {
      openNotification({
        type: "success",
        message: t("toasts.manage.user.remove_scs"),
      });
      refetch();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (successGrant && dataGrant) {
      openNotification({
        type: "success",
        message: t("toasts.manage.user.change_access"),
      });
      refetch();
    }
  }, [successGrant, dataGrant]);

  useEffect(() => {
    if (successRole && dataRole) {
      openNotification({
        type: "success",
        message: t("toasts.manage.user.change_role"),
      });
      refetch();
    }
  }, [successRole, dataRole]);

  const usersForTable = users.map((user) => ({
    name: (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 8px",
        }}
      >
        <div style={{ wordWrap: "break-word" }}>
          {user.surname} {user.patronymic ? user.name[0] : user.name}
          {user.patronymic ? `.${user.patronymic[0]}` : ""}
        </div>
        {user.id !== myProfile?.id && (
          <IconButtonStyled
            onClick={() => deleteUser(user.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButtonStyled>
        )}
      </div>
    ),
    role: user.role,
    access: (
      <Checkbox
        defaultChecked={user.access}
        onChange={(e) => setAccess(e.target.checked, user.id)}
      />
    ),
    login: user.login,
    email: user.email,
    actions: <UserActionMenu user={user} setRole={setRole} />,
  }));
  const headerWords = [
    t("manage.header.user.fio"),
    t("manage.header.user.role"),
    t("manage.header.user.access"),
    t("manage.header.user.login"),
    t("manage.header.user.email"),
    t("manage.header.user.action"),
  ];
  return (
    <>
      <TableHeader headerWords={headerWords} />
      {usersForTable.map((user, index) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <TableRow content={user} key={index}></TableRow>
      ))}
    </>
  );
};
