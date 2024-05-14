import React, { FC, useState } from "react";
import { Button } from "../../UI/Button";
import { useTheme } from "../../../utils/theme";
import { ModalStyled } from "../../UI/Modal/ui/Modal.styled";
import UsersListForChat from "./UsersListForChat";
import axios from "axios";
import { BASE_URL } from "../../../api/config/config";

type Props = {
  refetch: any;
};

const CreateChat: FC<Props> = ({ refetch }) => {
  const [isModal, setIsModal] = useState(false);
  const { theme } = useTheme();
  const handleOpen = () => {
    setIsModal(true);
  };
  const handleClose = () => {
    setIsModal(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} text={"Создать чат"} />
      <ModalStyled
        width={"600px"}
        theme={theme}
        onCancel={handleClose}
        title={"Выбор пользователя"}
        open={isModal}
        footer={null}
      >
        <UsersListForChat onClose={handleClose} refetch={refetch} />
      </ModalStyled>
    </div>
  );
};

export default CreateChat;
