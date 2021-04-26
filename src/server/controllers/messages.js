const Messages = require("../db/messages");

const sendMessage = (req, res) => {
  const { message, to, from } = req.body;
  console.log(message);
  console.log(to);
  console.log(from);
  const ok = Messages.addMessage(message, from, to);
  if (ok) {
    console.log("SKAL HA LAGT TIL MELDINGEN");
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

const getUserMessages = (req, res) => {
  const messages = Messages.sentMessages(req.user.username);

  res.send(messages);
};

module.exports = { sendMessage, getUserInbox, getUserMessages };
