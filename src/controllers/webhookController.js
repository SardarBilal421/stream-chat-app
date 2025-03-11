const { StreamChat } = require("stream-chat");
const { STREAM_API_KEY, STREAM_API_SECRET } = require("../config/env");
const memoryStore = require("../utils/memoryStore");
const { generateAIResponse } = require("../services/geminiAIService");

const AI_COACH_USER_ID = "ai_coach";

const chatClient = new StreamChat(STREAM_API_KEY, STREAM_API_SECRET, {
  allowServerSideConnect: true,
});

const handleWebhook = async (req, res) => {
  const { type, message } = req.body;

  if (type === "message.new" && message.user.id !== AI_COACH_USER_ID) {
    try {
      const learnerId = message.user.id;
      const learnerMessage = message.text;

      // Check and set initial context if this is the first message
      const isFirstMessage = memoryStore.setInitialContext(
        learnerId,
        learnerMessage
      );

      // Add message to conversation history
      memoryStore.addToConversation(learnerId, learnerMessage);

      // Get the full memory context
      const learnerMemory = memoryStore.get(learnerId);

      // Generate AI response with context awareness
      const aiResponse = await generateAIResponse(
        learnerMessage,
        learnerMemory,
        isFirstMessage
      );

      const channelId = `${learnerId}_${AI_COACH_USER_ID}`;

      await chatClient.channel("messaging", channelId).sendMessage({
        text: aiResponse,
        user_id: AI_COACH_USER_ID,
      });
    } catch (error) {
      console.error("Error processing webhook:", error);
    }
  }
  res.status(200).send("ok");
};

module.exports = {
  handleWebhook,
};
