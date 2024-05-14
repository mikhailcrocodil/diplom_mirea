import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Link = styled(NavLink)`
  all: unset;
`;

export const CardAddStyled = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 170px;
  cursor: pointer;
  transition: 0.3s all;
  text-align: center;
  padding: 24px 8px;
  border-radius: 12px;
  border: 1px solid rgba(139, 136, 136, 0.15);
  justify-content: space-around;
  &:hover {
    color: #69b1ff;
  }
  & > svg {
    font-size: 64px;
  }

  & > span {
    font-size: 18px;
    font-weight: 600;
  }

  &:hover {
    background: rgba(148, 146, 146, 0.11);
    & > svg {
      color: #69b1ff;
    }
  }
`;
