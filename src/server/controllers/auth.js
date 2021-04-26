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

module.exports = { getUser, signOut, signIn };
