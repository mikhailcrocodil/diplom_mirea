import { useEffect } from "react";
import { useGetUser } from "../../../../shared/hooks/useGetUser";
import { useRemoveStudentFromCourse } from "../../../../api/hooks/course/course-table/useRemoveStudentFromCourse";
import useToast from "../../../../shared/UI/Toast/useToast";
import styled from "styled-components";
import { Tooltip } from "antd";
import { useCourseWithUsers } from "../../../../api/hooks/course/course-table/useCourseWithUsers";

type Props = {
  id: number;
  refetch: () => void;
};

const StudentCell = styled("span")`
  transition: 0.3s all;
  cursor: pointer;
  &:hover {
    color: var(--file-color);
  }
`;

export const StudentsCell = ({ id, refetch }: Props) => {
  const { setFullName } = useGetUser();
  const openNotification = useToast();
  const { removeStudent, isSuccess } = useRemoveStudentFromCourse();
  const { getUsersMutation, data: users } = useCourseWithUsers();

  useEffect(() => {
    getUsersMutation({ course_id: id, role: "student" });
  }, [getUsersMutation]);

  useEffect(() => {
    if (isSuccess) {
      openNotification({
        type: "success",
        message: `Ученик успешно удален с курса`,
      });
      window.location.reload();
      refetch();
    }
  }, [isSuccess, refetch]);

  const handleRemove = (student_id: number) => {
    removeStudent({ student_id, course_id: id });
  };

  return (
    <div>
      {users &&
        users.map((user, index) => (
          <StudentCell onClick={() => handleRemove(user.id)} key={user.id}>
            <Tooltip title={`Удалить студента "${setFullName(user)}" с курса`}>
              {users.length > 1
                ? `${setFullName(user)}${users.length - 1 !== index ? `, ` : ""}`
                : `${setFullName(user)}`}
            </Tooltip>
          </StudentCell>
        ))}
    </div>
  );
};
