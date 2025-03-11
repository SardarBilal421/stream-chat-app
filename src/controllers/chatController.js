const { createChannel } = require("../services/streamChatService");

const createChatChannel = async (req, res) => {
  try {
    const { learner_id } = req.body;
    const channelId = await createChannel(learner_id);
    res.json({ channel_id: channelId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createChatChannel };
