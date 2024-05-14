import styled from "styled-components";
import { Modal } from "antd";

type Props = {
  theme: "light" | "dark";
};

export const ModalStyled = styled(Modal)<Props>`
  .ant-modal-content,
  .ant-modal-header,
  .ant-modal-title {
    background: ${(props) => (props.theme === "light" ? "#fff" : "#1C1C1C")};
    color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
    svg {
      color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
    }
  }
  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
