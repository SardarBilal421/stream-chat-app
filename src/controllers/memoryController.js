const smartMemory = {};

const getMemory = (req, res) => {
  const { user_id } = req.query;
  res.json(smartMemory[user_id] || {});
};

const updateMemory = (req, res) => {
  const { user_id, updates } = req.body;
  const currentMemory = smartMemory[user_id] || {};
  Object.assign(currentMemory, updates);
  smartMemory[user_id] = currentMemory;
  res.json({ status: "updated", memory: currentMemory });
};

module.exports = { getMemory, updateMemory };
