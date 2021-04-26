const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require("../db/auth.js");
require("dotenv").config();

module.exports = (app) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        console.log(username, password);
        const ok = Users.verifyUser(username, password);

        if (!ok) {
          return done(null, false, { message: "Invalid username/password" });
        }

        const user = Users.getUser(username);
        return done(null, user);
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        if (profile.id !== undefined) {
          // check if user exists
          const user = Users.getUser(profile.name.givenName);
          if (user) {
            // if exists return the existing user
            return cb(null, user);
          } else {
            // if not, add to db
            const ok = Users.createGoogleUser(
              profile.name.givenName,
              profile.name.familyName,
              profile.email
              //profile.id
            );
            if (!ok) {
              // Should not happen with google
              return cb(null, false, { message: "Invalid username/password" });
            }
            const user = Users.getUser(profile.name.givenName);
            return cb(null, user);
          }
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    //console.log(user.username, "ser");
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    //console.log(user.username, "deSer");
    const user = Users.getUser(username);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
