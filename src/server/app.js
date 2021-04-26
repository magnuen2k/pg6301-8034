const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");

//IMPORT ROUTES HERE
const authRoutes = require("./routes/auth");

const app = express();

app.use(
  session({
    secret: "test",
    cookie: {
      maxAge: 60 * 60 * 60 * 2,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// EXEC ROUTES AND AUTH
// auth
require("./auth/authHandling")(app);

// routes
app.use("/api/auth", authRoutes);

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

module.exports = app;
