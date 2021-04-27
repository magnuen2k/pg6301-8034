const Messages = require("../db/messages");

const sendMessage = (req, res) => {
  const { message, to, from } = req.body;
  const ok = Messages.newMessage(message, from, to);

  if (ok) {
    res.sendStatus(200);
  }
};

const getUserInbox = (req, res) => {
  if (req.user) {
    const inbox = Messages.getInbox(req.user.username);
    res.send(inbox);
  } else {
    res.sendStatus(400);
  }
};

const reply = (req, res) => {
  const { message, from, to, replyTo_id } = req.body;
  Messages.replyMessage(message, from, to, replyTo_id);
  res.sendStatus(200);
};

const getUserMessages = (req, res) => {
  if (req.user) {
    const messages = Messages.sentMessages(req.user.username);
    res.send(messages);
  }
};

const deleteMessage = (req, res, next) => {
  const mid = parseInt(req.params.id);
  const ok = Messages.deleteMessage(mid, req.user.username);
  if (ok) {
    res.sendStatus(204);
  }
  next();
};

const getArchive = (req, res) => {
  if (req.user) {
    const archive = Messages.getArchive(req.user.username);
    res.send(archive);
  } else {
    res.sendStatus(400);
  }
};

module.exports = {
  sendMessage,
  getUserInbox,
  getUserMessages,
  reply,
  deleteMessage,
  getArchive,
};
