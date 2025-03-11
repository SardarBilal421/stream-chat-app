const express = require("express");
const { createChatChannel } = require("../controllers/chatController");

const router = express.Router();

router.post("/create_channel", createChatChannel);

module.exports = router;
