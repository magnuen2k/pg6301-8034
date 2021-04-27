const { getUser } = require("./auth");
const { sockets } = require("../websocket");

const messages = new Map();
const recipients = [];

let nextAvailableId = 1;

const getMessage = (mid) => {
  return messages.get(mid);
};

const getInbox = (username) => {
  const user = getUser(username);
  if (!user) {
    return false;
  }
  let userMessages = [];
  for (let recipient of recipients) {
    if (recipient.to === username && recipient.status) {
      userMessages.push(messages.get(recipient.mid));
    }
  }
  return userMessages;
};

const sentMessages = (username) => {
  const user = getUser(username);
  if (!user) {
    return false;
  }

  let sentMessages = [];
  for (let [key, value] of messages) {
    if (value.from === username) {
      sentMessages.push(messages.get(key));
    }
  }
  return sentMessages;
};

// Archive message (set status to archived?)
const deleteMessage = (mid) => {
  return messages.delete(mid);
};

const replyMessage = (msg, from, to, replyTo_id) => {
  return addMessage(msg, from, to, replyTo_id, "reply");
};

const newMessage = (msg, from, to) => {
  return addMessage(msg, from, to, null, "new");
};

const addMessage = (msg, from, to, replyTo_id, type) => {
  const fromUser = getUser(from);
  if (!fromUser) {
    return false;
  }
  const mid = nextAvailableId++;
  const message = {
    mid,
    from,
    content: msg,
    time: new Date(),
    type,
    replyTo_id,
  };

  messages.set(mid, message);

  to.map((user) => {
    recipients.push({ mid, to: user, status: true });
    notifyUsers(user);
  });

  return true;
};

// Notify the user receiving a message
const notifyUsers = (to) => {
  for (let [username, socket] of sockets) {
    if (to === username) {
      socket.send(JSON.stringify({ message: "u got a message" }));
    }
  }
};

module.exports = {
  getMessage,
  getInbox,
  newMessage,
  sentMessages,
  replyMessage,
  deleteMessage,
};
