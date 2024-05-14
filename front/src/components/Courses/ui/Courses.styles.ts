import styled from "styled-components";

export const CourseCardsTitle = styled("span")`
  font-size: 48px;
  color: var(--title-color);
  font-weight: 700;
`;

export const CoursesContent = styled("div")`
  margin-top: 36px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  cursor: pointer;
  gap: 60px 30px;
  & > div {
    transition: 0.3s all;
  }
  & > div:hover {
    transform: scale(1.02);
  }
`;

export const CourseCardStyled = styled("div")`
  width: 324px;
  padding: 16px 26px 26px 26px;
  border-radius: 20px;
  border: 1px solid var(--border-card-color);
  color: var(--title-color);
`;

export const CourseCardTitleStyled = styled("span")`
  font-size: 24px;
  font-weight: 500;
`;

export const CourseCardTextStyled = styled("span")`
  font-size: 18px;
  font-weight: 400;
`;
