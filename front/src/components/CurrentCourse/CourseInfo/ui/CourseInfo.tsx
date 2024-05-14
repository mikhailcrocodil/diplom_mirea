import {
  AdaptiveTestsMinProps,
  CourseInfoModel,
  MaterialType,
  TCourse,
  UserRole,
} from "../../../../api/models";
import React, { FC, useState } from "react";
import {
  CourseCards,
  CourseWrapper,
  MaterialStyled,
} from "./CourseInfo.styled";
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { CurrentModule } from "./CurrentModule/CurrentModule";
import { useGetUser } from "../../../../shared/hooks/useGetUser";
import AddIcon from "@mui/icons-material/Add";
import { Flex, Tooltip } from "antd";
import { useTheme } from "../../../../utils/theme";
import { ModalStyled } from "../../../UI/Modal/ui/Modal.styled";
import { useTranslation } from "react-i18next";
import { AddModule } from "../../../Add/ui/AddModule/AddModule";
import { SiKnowledgebase } from "react-icons/si";
import { AddMaterialModal } from "../../../AdaptiveTest/AdaptiveTestModal";
import Card from "../../../UI/Card/Card";
import { RoutePath } from "../../../../app/routing/libs/routePaths";
import { NavLink } from "react-router-dom";
import { useMaterialIcon } from "../../../../shared/hooks/useMaterialIcon";

type Props = {
  course: TCourse;
  modules: CourseInfoModel["modules"][];
  refetch: () => void;
  adaptiveTests?: AdaptiveTestsMinProps[];
};

export const CourseInfo: FC<Props> = ({
  modules,
  adaptiveTests,
  course,
  refetch,
}) => {
  const userId = useLocalStorage();
  const { userRole } = useGetUser();
  const { setIcon } = useMaterialIcon();
  const isTeacherCourse =
    Number(userId.userId) === course.teacher_id ||
    Number(userId.userId) === course.tutor_id ||
    userRole === UserRole.ADMIN;
  const [isModal, setIsModal] = useState(false);
  const { theme } = useTheme();
  const handleOpen = () => {
    localStorage.setItem("course", String(course.id));
    setIsModal(true);
  };
  const { t } = useTranslation();
  const handleClose = () => {
    localStorage.removeItem("moduleId");
    setIsModal(false);
  };

  const [isModalAdaptiveTest, setIsModalAdaptiveTest] = useState(false);
  const handleOpenModalAdaptiveTest = () => {
    setIsModalAdaptiveTest(true);
  };
  const handleCloseModalAdaptiveTest = () => {
    setIsModalAdaptiveTest(false);
  };

  return (
    <CourseWrapper>
      <Flex align={"center"} gap={12}>
        <h3>{course.title}</h3>
        {isTeacherCourse && (
          <Flex align={"center"} gap={12}>
            <Tooltip title={t("add.module.add_module")}>
              <AddIcon onClick={handleOpen} style={{ cursor: "pointer" }} />
            </Tooltip>
            <ModalStyled
              width={"600px"}
              theme={theme}
              onCancel={handleClose}
              title={t("add.module.submit")}
              open={isModal}
              footer={null}
            >
              <AddModule refetch={refetch} onClose={handleClose} />
            </ModalStyled>
            <Tooltip title={"Назначить адаптивный тест"}>
              <SiKnowledgebase
                onClick={handleOpenModalAdaptiveTest}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
            <ModalStyled
              width={"600px"}
              theme={theme}
              onCancel={handleCloseModalAdaptiveTest}
              title={"Назначить адаптивный тест студенту"}
              open={isModalAdaptiveTest}
              footer={null}
            >
              <AddMaterialModal
                handleClose={handleCloseModalAdaptiveTest}
                courseId={Number(course.id)}
              />
            </ModalStyled>
          </Flex>
        )}
      </Flex>
      <CourseCards>
        {adaptiveTests &&
          adaptiveTests.map((adTest, index) => (
            <Card key={adTest.id} headerTitle={`${adTest.title} ${index + 1}`}>
              <NavLink to={`/adaptive-test/${adTest.id}`}>
                <MaterialStyled>
                  {setIcon(MaterialType.TEST)}
                  <span>
                    {adTest.title} {index + 1}
                  </span>
                </MaterialStyled>
              </NavLink>
            </Card>
          ))}
        {modules
          .sort((a, b) => a.module.id - b.module.id)
          .map((module) => (
            <CurrentModule
              refetch={refetch}
              courseId={course.id}
              isTeacherCourse={isTeacherCourse}
              key={module.module.id}
              currentModule={module}
            />
          ))}
      </CourseCards>
    </CourseWrapper>
  );
};
