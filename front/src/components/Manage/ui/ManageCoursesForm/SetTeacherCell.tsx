import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useState } from "react";
import { useGetUser } from "../../../../shared/hooks/useGetUser";
import { useAddTeacherToCourse } from "../../../../api/hooks/course/course-table/useAddTeacherToCourse";
import { useGetUsersForCourse } from "../../../../api/hooks/course/course-table/useGetUsersForCourse";
import useToast from "../../../../shared/UI/Toast/useToast";

type Props = {
  id: number;
  refetch: () => void;
};

export const SetTeacherCell = ({ id, refetch }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openNotification = useToast();
  const { setFullName } = useGetUser();
  const { getUsersMutation, data: teachers } = useGetUsersForCourse();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    getUsersMutation({ course_id: id, role: "teacher" });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { addTeacher, isSuccess } = useAddTeacherToCourse();

  const handleAdd = (teacher_id: number) => {
    addTeacher({ teacher_id, course_id: id });
  };

  useEffect(() => {
    if (isSuccess) {
      openNotification({
        type: "success",
        message: "Преподаватель успешно назначен на курс",
      });
      refetch();
      getUsersMutation({ course_id: id, role: "teacher" });
    }
  }, [isSuccess, refetch]);

  return (
    <>
      <Button
        onClick={(e) => handleClick(e)}
        style={{ fontWeight: 700, fontSize: 14, position: "relative" }}
        variant={"text"}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Изменить преподавателя
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {teachers?.map((item: any) => (
          <MenuItem onClick={() => handleAdd(item.id)} key={item.id}>
            {setFullName(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
