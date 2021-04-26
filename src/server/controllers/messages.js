const Messages = require("../db/messages");
const { sockets } = require("../websocket");

const sendMessage = (req, res) => {
  const { message, to, from } = req.body;
  const ok = Messages.newMessage(message, from, to);

  for (let [username, socket] of sockets) {
    if (to.includes(username)) {
      socket.send("you got mail biiitch");
    }
  }

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
  const ok = Messages.deleteMessage(mid);
  if (ok) {
    console.log("yes");
    res.sendStatus(204);
  }
  next();
};

module.exports = {
  sendMessage,
  getUserInbox,
  getUserMessages,
  reply,
  deleteMessage,
};
