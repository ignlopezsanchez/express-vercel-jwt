const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("./configs/config");
const app = express();
app.set("key", config.key);
app.use(express.urlencoded());
app.use(app.json());

app.get("/api", (req, res) => {
  res.json({ hola: "pepe" });
});

const protectedRoutes = express.Router();
protectedRoutes.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, app.get("key"), (err, decoded) => {
      if (err) {
        return res.json({ message: "Token not valid" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      message: "Token not provided.",
    });
  }
});

app.post("/api/login", (req, res) => {
  if (req.body.user === "mock_user" && req.body.password === "mock_password") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("key"), {
      expiresIn: 1440,
    });
    res.json({
      message: "Success",
      token: token,
    });
  } else {
    res.json({ message: "User or password not found" });
  }
});
app.get("/api/users", protectedRoutes, (req, res) => {
  const users = [
    { id: 1, name: "Asfo" },
    { id: 2, name: "Denisse" },
    { id: 3, name: "Carlos" },
  ];

  res.json(users);
});
module.exports = app;
