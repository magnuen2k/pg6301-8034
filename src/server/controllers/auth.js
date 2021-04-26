const Users = require("../db/auth");
const passport = require("passport");

const getUser = (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    console.log("not logged in");
  }
};

const signUp = (req, res) => {
  const { username, password } = req.body;
  console.log("we came here");

  const newUser = Users.createUser(username, password);

  if (!newUser) {
    res.status(400).send();
    return;
  }

  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) {
        //shouldn't really happen
        res.status(500).send();
      } else {
        res.status(201).json(req.user);
      }
    });
  });
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
  const usersToMessage = Users.getUsersToMessage(req.user.username);
  //const usersToMessage = ["test"];
  console.log(usersToMessage);
  res.send(usersToMessage);
};

module.exports = { getUser, signOut, signIn, getUsersToMessageFromDb, signUp };
