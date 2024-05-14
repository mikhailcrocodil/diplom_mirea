import styled from "styled-components";

export const CourseWrapper = styled("div")`
  & h3 {
    color: var(--title-color);
    font-weight: 600;
    font-size: 28px;
  }
`;

export const CourseCards = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 34px 0 64px;
  & a {
    color: var(--file-color);
    text-decoration: none;
  }
`;

export const CourseContentStyled = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 14px;
  white-space: pre-wrap;
`;

export const TitleBlock = styled("span")`
  font-weight: 700;
`;

export const Themes = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ThemeStyled = styled("div")`
  & > span:first-child {
    font-weight: 700;
    font-size: 20px;
  }
  & > ul {
    font-size: 20px;
  }
`;

export const Theme = styled("span")`
  font-weight: 700;
  font-size: 20px;
`;

export const ThemeContent = styled("div")`
  margin: 20px 0 0 40px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  color: var(--file-color);
  & a {
    color: var(--file-color);
    text-decoration: none;
  }
`;

export const ItemStyled = styled("div")`
  display: flex;
  align-items: center;
  & > svg:first-child {
    font-size: 30px;
  }
`;

export const MaterialStyled = styled("div")`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  & > svg {
    color: var(--file-color);
    font-size: 32px;
  }
`;

export const IconStyled = styled("div")`
  height: 22px;
  cursor: pointer;
`;
