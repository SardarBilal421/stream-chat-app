const { sendMessage } = require("../services/streamChatService");
const { generateAIResponse } = require("../services/geminiAIService");
const { AI_COACH_USER_ID } = require("../config/env");

const smartMemory = {};

const handleWebhook = async (req, res) => {
  const { type, message } = req.body;

  if (type === "message.new" && message.user.id !== AI_COACH_USER_ID) {
    try {
      const learnerId = message.user.id;
      const learnerMessage = message.text;

      if (!smartMemory[learnerId]) {
        smartMemory[learnerId] = {
          initial_context: learnerMessage,
          timestamp: new Date().toISOString(),
          updates: {},
        };
      }

      const learnerMemory = smartMemory[learnerId] || {};
      const aiResponse = await generateAIResponse(
        learnerMessage,
        learnerMemory
      );
      const channelId = `${learnerId}_${AI_COACH_USER_ID}`;

      await sendMessage(channelId, {
        text: aiResponse,
        user_id: AI_COACH_USER_ID,
      });
    } catch (error) {
      console.error("Error processing webhook:", error);
    }
  }
  res.status(200).send("ok");
};

module.exports = { handleWebhook };
