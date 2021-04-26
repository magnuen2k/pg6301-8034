const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getUserInbox,
  getUserMessages,
  reply,
} = require("../controllers/messages");

router.post("/sendMessage", sendMessage);
router.get("/getInbox", getUserInbox);
router.get("/getUserMessages", getUserMessages);
router.post("/reply", reply);

module.exports = router;
