/*
  Simulation of a database storing users
 */

const users = new Map();

// default local user
const user = {
  username: "test",
  firstName: "test",
  lastName: "testing",
  email: "test@test.com",
  password: "test",
};
const user2 = {
  username: "test2",
  firstName: "test",
  lastName: "testing",
  email: "test@test.com",
  password: "test",
};

users.set(user.username, user);
users.set(user2.username, user2);

// User Service
const getUser = (username) => {
  return users.get(username);
};

const getUsersToMessage = (username) => {
  let usersToMessage = [];
  for ([key, value] of users) {
    if (key === username) {
      continue;
    }
    usersToMessage.push(key);
  }
  return usersToMessage;
};

const verifyUser = (username, password) => {
  const user = getUser(username);

  if (!user) {
    return false;
  }

  return user.password === password;
};

const createUser = (username, password) => {
  if (getUser(username)) {
    return false;
  }

  const user = {
    username,
    password,
  };

  users.set(username, user);
  return true;
};

const createGoogleUser = (username, lastName, email) => {
  if (getUser(username)) {
    return false;
  }

  const user = {
    username,
    firstName: username,
    lastName,
    email,
  };

  users.set(username, user);
  return true;
};

module.exports = {
  getUser,
  verifyUser,
  createUser,
  createGoogleUser,
  getUsersToMessage,
};
