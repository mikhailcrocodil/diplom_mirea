import React, { FC, useEffect, useState } from "react";
import { useChat } from "../../../api/hooks/chat/useChat";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { useQuery } from "react-query";
import { CourseInfoModel } from "../../../api/models";
import { Flex } from "antd";
import { ChatProps } from "../../../api/models/chat/chat.model";
import { Avatar } from "@mui/material";
import { AvatarBlockStyled } from "../../Header/ui/HeaderRight/HeaderRight.styled";
import { useGetUser } from "../../../shared/hooks/useGetUser";
import { useFormatDate } from "../../../shared/hooks/useFormatDate";
import { NavLink } from "react-router-dom";

type Props = {
  chats: ChatProps[];
};

const ChatList: FC<Props> = ({ chats }) => {
  const { setFullName } = useGetUser();
  const { formatIsoDateWithHours } = useFormatDate();
  return (
    <Flex vertical gap={20}>
      {chats.map((chat) => (
        <NavLink
          className={({ isActive }) =>
            isActive ? "link__active" : "link__not"
          }
          key={chat.id}
          to={`${chat.id}`}
        >
          <Flex style={{ cursor: "pointer" }} gap={12} align={"center"}>
            <AvatarBlockStyled id="basic-button" aria-haspopup="true">
              <Avatar
                style={{ width: "40px", height: "40px", background: "#ECE5E5" }}
              >
                {!chat.user?.img || chat.user?.img === "empty" ? (
                  <span
                    style={{ color: "#000", fontWeight: 500, fontSize: "14px" }}
                  >
                    {chat.user?.surname[0]}.{chat.user?.name[0]}
                  </span>
                ) : (
                  <img src={chat.user?.img} alt={"Avatar"} />
                )}
              </Avatar>
            </AvatarBlockStyled>
            <Flex vertical align={"start"}>
              <span style={{ fontSize: 16 }}>{setFullName(chat.user)}</span>
              <span style={{ fontSize: 16 }}>
                Дата создания чата: {formatIsoDateWithHours(chat.created_at)}
              </span>
            </Flex>
          </Flex>
        </NavLink>
      ))}
    </Flex>
  );
};

export default ChatList;
