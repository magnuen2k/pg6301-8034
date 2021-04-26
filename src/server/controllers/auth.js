const getUser = (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    console.log("not logged in");
  }
};

const signOut = (req, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
};

module.exports = { getUser, signOut };
