const express = require("express");
const { getMemory, updateMemory } = require("../controllers/memoryController");

const router = express.Router();

router.get("/", getMemory);
router.post("/", updateMemory);

module.exports = router;
