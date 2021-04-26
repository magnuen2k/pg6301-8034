const { getUser } = require("./auth");

const messages = new Map();
const recipients = new Map();

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
  for (let [key, value] of recipients) {
    if (value.to.includes(username)) {
      userMessages.push(messages.get(key));
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
    if (value.from.includes(username)) {
      sentMessages.push(messages.get(key));
    }
  }
  return sentMessages;
};

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
    mid: mid,
    from,
    content: msg,
    time: new Date(),
    type,
    replyTo_id,
  };
  const recipient = {
    mid,
    to,
    status: false,
  };
  messages.set(mid, message);
  recipients.set(mid, recipient);
  return true;
};

module.exports = {
  getMessage,
  getInbox,
  newMessage,
  sentMessages,
  replyMessage,
  deleteMessage,
};
