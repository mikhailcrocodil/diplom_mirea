import React, { FC } from "react";
import { ModalStyled } from "./Modal.styled";
import { useTheme } from "../../../../utils/theme";
import { ModalFooterRender } from "antd/es/modal/interface";

type Props = {
  open: boolean;
  title: string;
  handleOk: () => void;
  handleCancel: () => void;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  isFooter?: boolean;
};

export const ModalComponent: FC<Props> = ({
  handleCancel,
  okText,
  cancelText,
  title,
  handleOk,
  open,
  children,
  isFooter = true,
}) => {
  const { theme } = useTheme();
  return (
    <ModalStyled
      theme={theme}
      title={title}
      open={open}
      onOk={handleOk}
      okText={okText || ""}
      cancelText={cancelText || ""}
      onCancel={handleCancel}
    >
      <div>{children}</div>
    </ModalStyled>
  );
};
