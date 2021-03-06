const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getUser,
  signOut,
  signIn,
  signUp,
  getUsersToMessageFromDb,
} = require("../controllers/auth");

router.post("/signIn", passport.authenticate("local"), signIn);
router.post("/signUp", signUp);
router.get("/getUser", getUser);
router.get("/getUsersToMessage", getUsersToMessageFromDb);
router.get("/signOut", signOut);
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth",
    session: true,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
