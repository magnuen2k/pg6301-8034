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
    console.log("should return all messages for one user");
    const inbox = Messages.getInbox(req.user.username);
    if (inbox.length === 0) {
      console.log("no messages");
    }
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
  console.log("About to delete user from message" + mid);
  const ok = Messages.deleteMessage(mid, req.user.username);
  console.log(ok);
  if (ok) {
    res.sendStatus(204);
  }
  next();
};

const getArchive = (req, res) => {
  console.log("reading archive");
  if (req.user) {
    const archive = Messages.getArchive(req.user.username);
    if (archive.length === 0) {
      console.log("no messages");
    }
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
