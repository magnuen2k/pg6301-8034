const { getUser } = require("./auth");

const messages = new Map();
const recipients = new Map();

let counter = 0;

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
  console.log(userMessages);
  return userMessages;
};

const addMessage = (msg, from, to) => {
  const fromUser = getUser(from);
  if (!fromUser) {
    return false;
  }
  const mid = counter++;
  const message = {
    mid: mid,
    from,
    content: msg,
    time: "test tid",
  };
  const recipient = {
    mid: mid,
    to: to,
    status: false,
  };
  messages.set(mid, message);
  recipients.set(mid, recipient);
  return true;
};

module.exports = { getMessage, getInbox, addMessage };
