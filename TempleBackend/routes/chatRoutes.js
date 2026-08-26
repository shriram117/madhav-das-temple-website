const express = require("express");

const router = express.Router();

const {
    chatWithAI
} = require("../controllers/chatController");

console.log("🤖 chatRoutes.js loaded");

router.post("/", chatWithAI);

module.exports = router;