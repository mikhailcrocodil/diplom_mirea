import { CourseModel } from "../../../api/models/index";
import {
  CourseCardStyled,
  CourseCardTextStyled,
  CourseCardTitleStyled,
} from "./Courses.styles";
import { Flex } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useFormatHours } from "../../../shared/hooks/useFormatHours";
import { useNavigate } from "react-router-dom";

type Props = {
  card: CourseModel;
};
export function CourseCard({ card }: Props) {
  const course = card.course;
  const teacher = card.teacher;
  const teacherName = `${teacher.name} ${teacher.surname[0]}.${teacher.patronymic?.[0] ?? ""}`;
  const navigate = useNavigate();
  const { formatHours } = useFormatHours();

  return (
    <CourseCardStyled
      onClick={() => {
        localStorage.setItem("courseId", course.id);
        navigate(`./${course.id}`);
      }}
    >
      <Flex gap={"64px"} vertical justify={"space-between"}>
        <Flex vertical gap={"16px"}>
          <Flex align={"center"} justify={"space-between"}>
            <CourseCardTitleStyled>{course.title}</CourseCardTitleStyled>
            {/*<CourseCardTextStyled style={{ color: color }}>*/}
            {/*  {card.completedTasks} из {card.allTasks}*/}
            {/*</CourseCardTextStyled>*/}
          </Flex>
          <CourseCardTextStyled>{teacherName}</CourseCardTextStyled>
        </Flex>
        <Flex align={"center"} gap={"10px"}>
          <ClockCircleOutlined />
          <CourseCardTextStyled>
            {formatHours(course.duration)}
          </CourseCardTextStyled>
        </Flex>
      </Flex>
    </CourseCardStyled>
  );
}
