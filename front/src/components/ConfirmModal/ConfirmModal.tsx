import { Flex, Modal } from "antd";
import { FC } from "react";
import { Button } from "../UI/Button";
import { useTheme } from "../../utils/theme";
import { ModalStyled } from "../UI/Modal/ui/Modal.styled";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  handleOk: () => void;
  handleCancel: () => void;
  open: boolean;
};

const TextStyled = styled("span")`
  font-size: 16px;
  font-weight: 450;
  margin: 20px 0;
`;

export const ConfirmModal: FC<Props> = ({
  handleOk,
  handleCancel,
  title,
  open,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <ModalStyled
      onCancel={handleCancel}
      theme={theme}
      open={open}
      footer={null}
      title={title}
    >
      <TextStyled>{t("common.confirm_modal")}</TextStyled>
      <Flex style={{ marginTop: 16 }} gap={16}>
        <Button onClick={handleCancel} text={t("buttons.cancel")} />
        <Button onClick={handleOk} text={t("buttons.confirm")} />
      </Flex>
    </ModalStyled>
  );
};
