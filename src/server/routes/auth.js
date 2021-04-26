const express = require("express");
const router = express.Router();
const passport = require("passport");

const { getUser, signOut } = require("../controllers/auth");

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
router.get("/getUser", getUser);
router.get("/signOut", signOut);

module.exports = router;
