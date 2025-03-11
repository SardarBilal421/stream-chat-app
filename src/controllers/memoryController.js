const memoryStore = require("../utils/memoryStore");

const getMemory = (req, res) => {
  const { user_id } = req.query;
  res.json(memoryStore.get(user_id));
};

const updateMemory = (req, res) => {
  const { user_id, updates } = req.body;
  const updatedMemory = memoryStore.update(user_id, updates);
  res.json({ status: "updated", memory: updatedMemory });
};

module.exports = {
  getMemory,
  updateMemory,
};
