import React from "react";
import { Outlet } from "react-router-dom";
import { ChatLeftStyled, ChatWrapper } from "./Pages.styled";
import CreateChat from "../components/Chat/CreateChat/CreateChat";
import ChatList from "../components/Chat/ChatList/ChatList";
import { useLocalStorage } from "../shared/hooks/useLocalStorage";
import { useGetChats } from "../api/hooks/chat/useGetChat";
const ChatPage = () => {
  const { userId } = useLocalStorage();
  const { data, refetch } = useGetChats(userId);
  return (
    <ChatWrapper>
      {data && (
        <ChatLeftStyled>
          <CreateChat refetch={refetch} />
          <ChatList chats={data} />
        </ChatLeftStyled>
      )}
      <Outlet />
    </ChatWrapper>
  );
};

export default ChatPage;
