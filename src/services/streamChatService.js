const { StreamChat } = require("stream-chat");
const {
  STREAM_API_KEY,
  STREAM_API_SECRET,
  AI_COACH_USER_ID,
} = require("../config/env");

const chatClient = new StreamChat(STREAM_API_KEY, STREAM_API_SECRET, {
  allowServerSideConnect: true,
});

const createToken = (userId) => chatClient.createToken(userId);

const upsertUser = async (userId, name) => {
  await chatClient.upsertUser({ id: userId, name: name || userId });
};

const createChannel = async (learnerId) => {
  const channelId = `${learnerId}_${AI_COACH_USER_ID}`;
  const channel = chatClient.channel("messaging", channelId, {
    members: [learnerId, AI_COACH_USER_ID],
  });
  await channel.create(learnerId);
  return channelId;
};

const sendMessage = async (channelId, message) => {
  await chatClient.channel("messaging", channelId).sendMessage(message);
};

module.exports = {
  chatClient,
  createToken,
  upsertUser,
  createChannel,
  sendMessage,
};
