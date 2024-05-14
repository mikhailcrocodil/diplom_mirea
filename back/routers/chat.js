const express = require("express");
const router = express.Router();
const Chat = require("../controllers/chat");

router.post("/get-existed-chats", Chat.getExistedChats);
router.post("/get-users-for-new-chat", Chat.getUsersForNewChat);
router.post("/create-chat", Chat.createChat);
router.post("/get-chat-messages", Chat.getChatMessages);
router.post("/send-message", Chat.sendMessage);
router.post("/delete-message", Chat.deleteMessage);
router.post("/edit-message", Chat.updateMessage);

module.exports = router;
