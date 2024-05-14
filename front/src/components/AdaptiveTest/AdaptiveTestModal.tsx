import { Flex } from "antd";
import { MdOutlineSchool } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import React, { ReactNode, useState } from "react";
import { AddModalItem } from "../Add/ui/AddMaterialModal/AddModalItem";
import SetAdaptiveTest from "../CurrentCourse/CourseInfo/ui/SetAdaptiveTest/SetAdaptiveTest";
import { ModalStyled } from "../UI/Modal/ui/Modal.styled";
import { useTheme } from "../../utils/theme";

export type ModalItemProps = {
  icon: ReactNode;
  text: any;
  toLink?: string;
  type?: string;
  onClick?: () => void;
  isLink?: boolean;
};

export const AddMaterialModal = ({
  courseId,
  handleClose,
}: {
  courseId: number;
  handleClose: () => void;
}) => {
  const { theme } = useTheme();
  const [isModalAdaptiveTest, setIsModalAdaptiveTest] = useState(false);
  const handleOpenModalAdaptiveTest = () => {
    setIsModalAdaptiveTest(true);
  };
  const handleCloseModalAdaptiveTest = () => {
    setIsModalAdaptiveTest(false);
  };
  const ModalItems: ModalItemProps[] = [
    {
      icon: <MdOutlineSchool />,
      text: "Информация об адаптивном тесте данного курса",
      toLink: `/adaptive-test-info/${courseId}`,
    },
    {
      icon: <FiFileText />,
      text: "Назначить адаптивный тест студенту",
      isLink: false,
      onClick: handleOpenModalAdaptiveTest,
    },
    {
      icon: <MdOutlineSchool />,
      text: "Посмотреть пройденные тесты студентов",
      toLink: `/adaptive-test-students-info/${courseId}`,
    },
  ];
  return (
    <Flex align={"center"} justify={"center"} gap={32} wrap={"wrap"}>
      {ModalItems.map((item) => (
        <>
          <AddModalItem
            toLink={item.toLink}
            icon={item.icon}
            text={item.text}
            onClick={item.onClick}
            key={item.text}
          />
        </>
      ))}
      <ModalStyled
        width={"600px"}
        theme={theme}
        onCancel={handleCloseModalAdaptiveTest}
        title={"Назначить адаптивный тест студенту"}
        open={isModalAdaptiveTest}
        footer={null}
      >
        <SetAdaptiveTest
          handleClose={handleClose}
          course_id={Number(courseId)}
          onClose={handleCloseModalAdaptiveTest}
        />
      </ModalStyled>
    </Flex>
  );
};
