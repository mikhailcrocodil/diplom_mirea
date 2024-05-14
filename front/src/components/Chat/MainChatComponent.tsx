import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMessages } from "../../api/hooks/chat/useGetMessages";
import {
  ChatMessagesStyled,
  CreatedDate,
  CurrentChatStyled,
  IconSubmit,
  InputWrapper,
  MessageStyled,
  MsgSpan,
} from "./Chat.styled";
import { InputStyled } from "../Add/ui/AddMaterial/AddMaterial.styled";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { Flex } from "antd";
import axios from "axios";
import { BASE_URL } from "../../api/config/config";
import { Avatar } from "@mui/material";
import { AvatarBlockStyled } from "../Header/ui/HeaderRight/HeaderRight.styled";
import { Close, Delete, Edit } from "@mui/icons-material";
import { MessageProps } from "../../api/models/chat/chat.model";
import Loading from "../UI/Loading/Loading";
import { useFormatDate } from "../../shared/hooks/useFormatDate";

const MainChatComponent = () => {
  const chat_id = useParams().chat_id;
  const { userId } = useLocalStorage();
  const { data, refetch, status, isLoading } = useGetMessages(chat_id);
  const [text, setText] = useState<string>("");
  const [editableMessageId, setEditableMessageId] = useState<number | null>(
    null,
  );
  const [editableText, setEditableText] = useState<string>("");

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId]);

  const handleEdit = (message: MessageProps) => {
    setEditableMessageId(message.id);
    setEditableText(message.text);
  };

  const { formatIsoDateWithHours } = useFormatDate();

  async function addMessage(chat_id: number, user_id: number, text: string) {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/chat/send-message`,
      {
        chat_id,
        user_id,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  async function editMessage(message_id: number, text: string) {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/chat/edit-message`,
      {
        message_id,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  async function deleteMessage(message_id: number) {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/chat/delete-message`,
      {
        message_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (text === "") {
      return;
    }
    if (userId && chat_id) {
      setText("");
      await addMessage(Number(chat_id), Number(userId), text);
      refetch();
    }
  };

  const handleDelete = async (message_id: number) => {
    await deleteMessage(message_id);
    refetch();
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    await editMessage(Number(editableMessageId), editableText);
    setEditableText("");
    setEditableMessageId(null);
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (status === "error") {
    return <span>Содержимое чата не может быть загружено</span>;
  }

  return (
    <CurrentChatStyled>
      {data && data.length === 0 && (
        <span>Пока что сообщений нет. Напишите первое сообщение</span>
      )}
      <ChatMessagesStyled vertical gap={24}>
        {data &&
          data.map((message) => (
            <MessageStyled
              key={message.id}
              style={{
                display: "flex",
                flexDirection:
                  message.user_id === Number(userId) ? "row-reverse" : "row",
                alignItems: "center",
                maxWidth: "100%",
                alignSelf:
                  message.user_id === Number(userId)
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              {message.user_id === Number(userId) && (
                <Flex align={"center"} gap={6}>
                  {editableMessageId === message.id ? (
                    <Close
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEditableMessageId(null);
                        setEditableText("");
                      }}
                    />
                  ) : (
                    <Edit
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(message)}
                    />
                  )}
                  <Delete
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(message.id)}
                  />
                </Flex>
              )}
              <AvatarBlockStyled id="basic-button" aria-haspopup="true">
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#ECE5E5",
                  }}
                >
                  {!message.user?.img || message.user?.img === "empty" ? (
                    <span
                      style={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: "14px",
                      }}
                    >
                      {message.user?.surname[0]}.{message.user?.name[0]}
                    </span>
                  ) : (
                    <img src={message.user?.img} alt={"Avatar"} />
                  )}
                </Avatar>
              </AvatarBlockStyled>
              <Flex vertical gap={4}>
                {editableMessageId === message.id ? (
                  <form onSubmit={handleEditSubmit}>
                    <InputStyled
                      value={editableText}
                      onChange={(e) => setEditableText(e.target.value)}
                    />
                  </form>
                ) : (
                  <MsgSpan>{message.text}</MsgSpan>
                )}
                <CreatedDate>
                  Дата создания сообщения:{" "}
                  {formatIsoDateWithHours(message.created_at)}
                </CreatedDate>
              </Flex>
            </MessageStyled>
          ))}
      </ChatMessagesStyled>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputStyled
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%" }}
            placeholder={"Введите сообщение..."}
          />
          <IconSubmit onClick={handleSubmit}>
            <ArrowUpwardIcon />
          </IconSubmit>
        </InputWrapper>
      </form>
    </CurrentChatStyled>
  );
};

export default MainChatComponent;
