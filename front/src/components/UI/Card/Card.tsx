import React, { FC, FormEvent, ReactNode, useState } from "react";
import {
  CardContent,
  CardHeader,
  CardStyled,
  ExpandStyled,
} from "./Card.styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Flex, Tooltip } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { ModalStyled } from "../Modal/ui/Modal.styled";
import { useTheme } from "../../../utils/theme";
import { AddTheme } from "../../Add/ui/AddTheme/AddTheme";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { BASE_URL } from "../../../api/config/config";
import useToast from "../../../shared/UI/Toast/useToast";
import { ConfirmModal } from "../../ConfirmModal/ConfirmModal";
import { useTranslation } from "react-i18next";

type Props = {
  headerTitle: string;
  children: ReactNode;
  maxWidth?: string | number;
  isAddTheme?: boolean;
  moduleId?: number;
  isEdit?: boolean;
  refetch?: () => void;
  setEdit?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const CardComponent: FC<Props> = ({
  children,
  headerTitle,
  maxWidth = 495,
  isEdit = false,
  moduleId,
  isAddTheme = false,
  refetch,
  setEdit,
}) => {
  const openNotification = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { theme } = useTheme();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const { t } = useTranslation();
  const handleOpen = () => {
    localStorage.setItem("moduleId", String(moduleId));
    setIsModal(true);
  };
  const handleClose = () => {
    localStorage.removeItem("moduleId");
    setIsModal(false);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/delete/module`,
      {
        module_id: moduleId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      openNotification({
        type: "success",
        message: t("toasts.module.remove_module_scs"),
      });
      if (refetch) {
        refetch();
      }
    } else {
      openNotification({
        type: "error",
        message: t("toasts.module.remove_module_error"),
      });
      if (refetch) {
        refetch();
      }
    }
  };

  const handleOk = async () => {
    await handleSubmit();
    setIsModalConfirm(false);
  };

  const handleCancel = () => {
    setIsModalConfirm(false);
  };

  return (
    <CardStyled isCollapsed={isCollapsed} maxWidth={maxWidth}>
      <CardHeader onClick={() => setIsCollapsed(!isCollapsed)}>
        <Flex align={"center"} gap={12}>
          <h4 style={{ fontWeight: 500 }}>{headerTitle}</h4>
        </Flex>
        <Flex gap={4}>
          {isAddTheme && (
            <Flex align={"center"} gap={12}>
              <Tooltip title={t("tooltips.remove_module")}>
                <DeleteIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalConfirm(true);
                  }}
                />
              </Tooltip>
              <>
                <Tooltip title={t("tooltips.add_theme")}>
                  <AddIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen();
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
              </>
            </Flex>
          )}
          {isEdit && (
            <Flex align={"center"} gap={12}>
              <div onClick={(e) => setEdit && setEdit(e)}>
                <Tooltip title={t("tooltips.edit_mode")}>
                  <EditIcon />
                </Tooltip>
              </div>
            </Flex>
          )}
          <ExpandStyled isCollapsed={isCollapsed}>
            <KeyboardArrowDownIcon />
          </ExpandStyled>
        </Flex>
      </CardHeader>
      <CardContent isCollapsed={isCollapsed}>{children}</CardContent>{" "}
      <ModalStyled
        width={"600px"}
        theme={theme}
        onCancel={handleClose}
        title={t("add.theme.add_theme")}
        open={isModal}
        footer={null}
      >
        <AddTheme refetch={refetch} onClose={handleClose} />
      </ModalStyled>
      <ConfirmModal
        open={isModalConfirm}
        title={t("tooltips.remove_module")}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </CardStyled>
  );
};

export default CardComponent;
