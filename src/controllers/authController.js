const { createToken, upsertUser } = require("../services/streamChatService");
const { STREAM_API_KEY } = require("../config/env");

const loginUser = async (req, res) => {
  try {
    const { user_id, name } = req.body;
    if (!user_id) throw new Error("User ID is required");

    const token = createToken(user_id);
    await upsertUser(user_id, name);
    res.json({ token, api_key: STREAM_API_KEY, user_id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser };
