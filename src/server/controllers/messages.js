const { addMessage, getInbox } = require("../db/messages");

const sendMessage = (req, res) => {
  const { message, to, from } = req.body;
  console.log(message);
  console.log(to);
  console.log(from);
  const ok = addMessage(message, from, to);
  if (ok) {
    console.log("SKAL HA LAGT TIL MELDINGEN");
  }
};

const getUserInbox = (req, res) => {
  if (req.user) {
    console.log("should return all messages for one user");
    const inbox = getInbox(req.user.username);
    res.send(inbox);
  }
};

module.exports = { sendMessage, getUserInbox };
