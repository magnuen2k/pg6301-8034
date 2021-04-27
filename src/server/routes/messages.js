const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getUserInbox,
  getUserMessages,
  reply,
  deleteMessage,
  getArchive,
} = require("../controllers/messages");

router.post("/sendMessage", sendMessage);
router.get("/getInbox", getUserInbox);
router.get("/getArchive", getArchive);
router.get("/getUserMessages", getUserMessages);
router.post("/reply", reply);
router.delete("/delete/:id", deleteMessage);

module.exports = router;
