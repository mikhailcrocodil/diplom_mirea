import styled from "styled-components";
import { Flex } from "antd";

export const CurrentChatStyled = styled("div")`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1 1 100%;
`;

export const InputWrapper = styled("div")`
  position: relative;
`;

export const IconSubmit = styled("div")`
  position: absolute;
  top: 6px;
  z-index: 11111;
  background: var(--bg-color);
  cursor: pointer;
  right: 6px;
`;

export const MessageStyled = styled("div")`
  gap: 12px;
  & > span {
    border: 1px solid;
    padding: 10px 14px;
    font-size: 14px;
    border-radius: 8px;
  }
`;

export const ChatMessagesStyled = styled(Flex)`
  max-height: 740px;
  padding-right: 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #131313;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #8f8786;
    border-radius: 20px;
    border: 3px solid #8f8786;
  }
`;

export const CreatedDate = styled("span")`
  font-size: 12px;
  border: none !important;
  color: gray;
`;

export const MsgSpan = styled("span")`
  & > span {
    border: 1px solid;
    padding: 10px 14px;
    font-size: 14px;
    border-radius: 8px;
  }
`;
