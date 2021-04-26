const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getUserInbox,
  getUserMessages,
} = require("../controllers/messages");

router.post("/sendMessage", sendMessage);
router.get("/getInbox", getUserInbox);
router.get("/getUserMessages", getUserMessages);

module.exports = router;
