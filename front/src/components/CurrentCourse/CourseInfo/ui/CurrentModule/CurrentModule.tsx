import {
  CourseContentStyled,
  IconStyled,
  ItemStyled,
  MaterialStyled,
  Theme,
  ThemeContent,
  Themes,
  ThemeStyled,
  TitleBlock,
} from "../CourseInfo.styled";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { FC, Fragment, useState } from "react";
import { LuDot } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../../../../app/routing/libs/routePaths";
import Card from "../../../../UI/Card/Card";
import { CourseInfoModel, MaterialType } from "../../../../../api/models";
import { useMaterialIcon } from "../../../../../shared/hooks/useMaterialIcon";
import { Flex, Tooltip } from "antd";
import AddIcon from "@mui/icons-material/Add";
import { ModalStyled } from "../../../../UI/Modal/ui/Modal.styled";
import { useTheme } from "../../../../../utils/theme";
import { AddMaterialModal } from "../../../../Add/ui/AddMaterialModal/AddMaterialModal";
import axios from "axios";
import { BASE_URL } from "../../../../../api/config/config";
import useToast from "../../../../../shared/UI/Toast/useToast";
import { ConfirmModal } from "../../../../ConfirmModal/ConfirmModal";
import { useTranslation } from "react-i18next";

type Props = {
  courseId: string;
  currentModule: CourseInfoModel["modules"];
  refetch: () => void;
  isTeacherCourse?: boolean;
};

export const CurrentModule: FC<Props> = ({
  courseId,
  refetch,
  currentModule,
  isTeacherCourse,
}) => {
  const openNotification = useToast();
  const module = currentModule.module;
  const themes = currentModule.themes;
  const { theme } = useTheme();
  const { setIcon } = useMaterialIcon();
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { t } = useTranslation();

  const [idForDeleteTheme, setIdForDeleteTheme] = useState<number | null>();
  const [isModalConfirm, setIsModalConfirm] = useState(false);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${BASE_URL}/delete/theme`,
      {
        theme_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.status === 200) {
      openNotification({
        type: "success",
        message: t("toasts.theme.remove_theme_scs"),
      });
      refetch();
    } else {
      openNotification({
        type: "error",
        message: t("toasts.theme.remove_theme_error"),
      });
      refetch();
    }
  };

  const handleOk = async () => {
    if (idForDeleteTheme) {
      await handleDelete(idForDeleteTheme);
      setIsModalConfirm(false);
    }
  };

  const handleCancel = () => {
    setIsModalConfirm(false);
  };

  const handleEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsEdit(!isEdit);
  };

  const handleOpen = (id: number) => {
    localStorage.setItem("themeId", String(id));
    localStorage.setItem("courseId", String(courseId));
    setIsModal(true);
  };
  const handleClose = () => {
    localStorage.removeItem("themeId");
    localStorage.removeItem("courseId");
    setIsModal(false);
  };

  const [materialId, setMaterialId] = useState<any>();
  const [materialType, setMaterialType] = useState<any>();
  const [isModalConfirmForMaterial, setIsModalConfirmForMaterial] =
    useState(false);

  const handleDeleteMaterial = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${BASE_URL}/delete/material`,
      {
        material_id: materialId,
        type: materialType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.status === 200) {
      openNotification({
        type: "success",
        message: t("toasts.material.remove_material_scs"),
      });
      refetch();
    } else {
      openNotification({
        type: "error",
        message: t("toasts.material.remove_material_error"),
      });
      refetch();
    }
  };

  const handleOkForMaterial = async () => {
    await handleDeleteMaterial();
    setIsModalConfirmForMaterial(false);
  };

  const handleCancelForMaterial = () => {
    setIsModalConfirmForMaterial(false);
  };

  return (
    <Card
      refetch={refetch}
      isAddTheme={isEdit}
      setEdit={(e) => handleEdit(e)}
      isEdit={isTeacherCourse}
      key={module.id}
      moduleId={currentModule.module.id}
      headerTitle={module.title}
    >
      <CourseContentStyled>
        {module.purpose_module && (
          <span>
            <TitleBlock>{t("course.purpose")}: </TitleBlock>
            {module.purpose_module}
          </span>
        )}
        <p>{module.description}</p>
        <Themes>
          {themes.map(({ materials, title, id }, index) => (
            <ThemeStyled key={id}>
              <Flex gap={16}>
                <Theme>
                  {t("common.theme")} {index + 1}. {title}
                </Theme>
                {isEdit && (
                  <Flex align={"center"} gap={6}>
                    <IconStyled>
                      <Tooltip title={t("tooltips.add_material")}>
                        <AddIcon onClick={() => handleOpen(id)} />
                      </Tooltip>
                      <ModalStyled
                        width={"600px"}
                        theme={theme}
                        onCancel={handleClose}
                        title={t("add.material.title")}
                        open={isModal}
                        footer={null}
                      >
                        <AddMaterialModal />
                      </ModalStyled>
                    </IconStyled>
                    <IconStyled>
                      <Tooltip title={t("tooltips.remove_theme")}>
                        <DeleteIcon
                          onClick={() => {
                            setIsModalConfirm(true);
                            setIdForDeleteTheme(id);
                          }}
                        />
                        <ConfirmModal
                          open={isModalConfirm}
                          title={t("tooltips.remove_theme")}
                          handleCancel={handleCancel}
                          handleOk={handleOk}
                        />
                      </Tooltip>
                    </IconStyled>
                  </Flex>
                )}
              </Flex>
              {}
              <ThemeContent>
                {materials?.map((material) => (
                  <Fragment key={material.id}>
                    <ItemStyled>
                      <LuDot />
                      {material.type === MaterialType.INFO && (
                        <NavLink to={`../${RoutePath.material}/${material.id}`}>
                          <MaterialStyled>
                            {setIcon(material.type)}
                            <span>{material.title}</span>
                          </MaterialStyled>
                        </NavLink>
                      )}
                      {material.type === MaterialType.TEST && (
                        <NavLink
                          to={`../${RoutePath.material}/test/${material.id}`}
                        >
                          <MaterialStyled>
                            {setIcon(material.type)}
                            <span>{material.title}</span>
                          </MaterialStyled>
                        </NavLink>
                      )}
                      {material.type === MaterialType.FILE && (
                        <NavLink to={``}>
                          <MaterialStyled>
                            {setIcon(material.type)}
                            <span>{material.title}</span>
                          </MaterialStyled>
                        </NavLink>
                      )}
                      {material.type === MaterialType.TASK && (
                        <NavLink
                          to={`../${RoutePath.material}/task/${material.id}`}
                        >
                          <MaterialStyled>
                            {setIcon(material.type)}
                            <span>{material.title}</span>
                          </MaterialStyled>
                        </NavLink>
                      )}
                      {isEdit && (
                        <Tooltip title={t("tooltips.remove_material")}>
                          <DeleteIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              setMaterialId(material.id);
                              setMaterialType(material.type);
                              setIsModalConfirmForMaterial(true);
                            }}
                            style={{ marginLeft: 16, cursor: "pointer" }}
                          />
                          <ConfirmModal
                            open={isModalConfirmForMaterial}
                            title={t("tooltips.remove_material")}
                            handleCancel={handleCancelForMaterial}
                            handleOk={handleOkForMaterial}
                          />
                        </Tooltip>
                      )}
                    </ItemStyled>
                  </Fragment>
                ))}
              </ThemeContent>
            </ThemeStyled>
          ))}
        </Themes>
      </CourseContentStyled>
    </Card>
  );
};
