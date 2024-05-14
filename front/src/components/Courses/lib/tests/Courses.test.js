import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { CourseCard } from "../../ui/CourseCard";

test("renders courses", () => {
  const mockCourse = {
    id: "1",
    title: "Математика",
    teacher: {
      id: "1",
      firstName: "Ирина",
      secondName: "Бекмурзаева",
      email: "ibek@bk.ru",
      patronymic: "Сергеевна",
    },
    description: "Математика",
    completedTasks: 3,
    allTasks: 7,
    timeCourse: 158,
  };
  render(<CourseCard card={mockCourse} />);

  const firstCourse = screen.getByText(/из/i);
  expect(firstCourse).toBeInTheDocument();

  const secondCourse = screen.getByText(/Математика/i);
  expect(secondCourse).toBeInTheDocument();
});
