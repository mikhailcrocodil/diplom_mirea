import React, { useEffect, useState } from "react";
import { useGetUser } from "../../../../shared/hooks/useGetUser";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { BASE_URL } from "../../../../api/config/config";
import useToast from "../../../../shared/UI/Toast/useToast";
import { useGetUsersForCourse } from "../../../../api/hooks/course/course-table/useGetUsersForCourse";

type Props = {
  id: number;
  refetch: () => void;
};

export const SetStudentsCell = ({ id, refetch }: Props) => {
  const openNotification = useToast();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setFullName } = useGetUser();
  const { getUsersMutation, data: teachers } = useGetUsersForCourse();
  useEffect(() => {
    getUsersMutation({ course_id: id, role: "student" });
  }, [getUsersMutation]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function addStudentReq(student_id: number, course_id: number) {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/course/add-new-student`,
      {
        course_id,
        student_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }

  const handleAddStudent = async (user_id: number) => {
    const req = await addStudentReq(Number(user_id), Number(id));
    if (req.status === 200) {
      openNotification({
        type: "success",
        message: `Студент успешно добавлен на курс`,
      });
      window.location.reload();
      refetch();
    } else {
      openNotification({
        type: "error",
        message: `Возникла ошибка при добавлении студента на курс`,
      });
    }
  };

  return (
    <>
      <Button
        onClick={(e) => handleClick(e)}
        style={{ fontWeight: 700, fontSize: 14, position: "relative" }}
        variant={"text"}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Назначить студентов
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
        {teachers?.map((item) => (
          <MenuItem onClick={() => handleAddStudent(item.id)} key={item.id}>
            {setFullName(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
