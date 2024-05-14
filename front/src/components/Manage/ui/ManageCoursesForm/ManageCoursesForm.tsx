import { CourseModel } from "../../../../api/models";
import React, { FC, useEffect, useState } from "react";
import { TableRow } from "../../../UI/Table-row/TableRow";
import { TableHeader } from "../../../UI/Table-header/TableHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButtonStyled } from "../ManageUsersForm/ManageUsersForm.styled";
import { StudentsCell } from "./StudentsCell";
import { SetTeacherCell } from "./SetTeacherCell";
import { SetStudentsCell } from "./SetStudentsCell";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "antd";
import { useTheme } from "../../../../utils/theme";
import { ModalStyled } from "../../../UI/Modal/ui/Modal.styled";
import { AddCourse } from "../../../Add/ui/AddCourse/AddCourse";
import axios from "axios";
import { BASE_URL } from "../../../../api/config/config";
import useToast from "../../../../shared/UI/Toast/useToast";
import { useTranslation } from "react-i18next";

type Props = {
  courses: CourseModel[];
  refetch: () => void;
};

export const ManageCoursesForm: FC<Props> = ({ courses, refetch }) => {
  const [isModal, setIsModal] = useState(false);
  const { theme } = useTheme();
  const openNotification = useToast();
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleOpen = () => {
    setIsModal(true);
  };
  const handleClose = () => {
    setIsModal(false);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${BASE_URL}/delete/course`,
      {
        course_id: id,
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
        message: t("toasts.manage.course.remove_scs"),
      });
      refetch();
    } else {
      openNotification({
        type: "error",
        message: t("toasts.manage.course.remove_error"),
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      openNotification({
        type: "success",
        message: t("toasts.manage.course.remove_scs"),
      });
      setIsSuccess(false);
    }
    if (refetch) {
      refetch();
    }
  }, [isSuccess]);

  const coursesForTable = courses.map((course) => ({
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
        <div style={{ wordWrap: "break-word" }}>{course.course.title}</div>
        <IconButtonStyled
          onClick={() => handleDelete(Number(course.course.id))}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButtonStyled>
      </div>
    ),
    description: course.course.description,
    teacher: (
      <div style={{ wordWrap: "break-word" }}>
        {course.teacher.surname}{" "}
        {course.teacher.patronymic
          ? course.teacher.name[0]
          : course.teacher.name}
        {course.teacher.patronymic ? `.${course.teacher.patronymic[0]}` : ""}
      </div>
    ),
    students: <StudentsCell refetch={refetch} id={Number(course.course.id)} />,
    setTeacher: (
      <SetTeacherCell refetch={refetch} id={Number(course.course.id)} />
    ),
    setStudents: (
      <SetStudentsCell refetch={refetch} id={Number(course.course.id)} />
    ),
  }));
  const headerWords = [
    t("manage.header.course.title"),
    t("manage.header.course.description"),
    t("manage.header.course.teacher"),
    t("manage.header.course.students"),
    t("manage.header.course.set_teacher"),
    t("manage.header.course.set_students"),
  ];
  return (
    <>
      <Tooltip title={t("add.course.submit")}>
        <AddIcon
          onClick={handleOpen}
          style={{ cursor: "pointer", marginBottom: 24 }}
        />
      </Tooltip>
      <ModalStyled
        width={"600px"}
        theme={theme}
        onCancel={handleClose}
        title={t("add.course.add_course")}
        open={isModal}
        footer={null}
      >
        <AddCourse refetch={refetch} onClose={handleClose} />
      </ModalStyled>
      <TableHeader headerWords={headerWords} />
      {coursesForTable.map((course, index) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <TableRow content={course} key={index}></TableRow>
      ))}
    </>
  );
};
