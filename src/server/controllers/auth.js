const users = require("../db/auth");

const getUser = (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    console.log("not logged in");
  }
};

const signIn = (req, res) => {
  const user = req.user;
  res.json(user);
};

const signOut = (req, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
};

const getUsersToMessageFromDb = (req, res) => {
  const usersToMessage = users.getUsersToMessage(req.user.username);
  //const usersToMessage = ["test"];
  console.log(usersToMessage);
  res.send(usersToMessage);
};

module.exports = { getUser, signOut, signIn, getUsersToMessageFromDb };
