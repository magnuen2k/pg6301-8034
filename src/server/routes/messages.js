const express = require("express");
const router = express.Router();

const { sendMessage, getUserInbox } = require("../controllers/messages");

router.post("/sendMessage", sendMessage);
router.get("/getInbox", getUserInbox);

module.exports = router;
