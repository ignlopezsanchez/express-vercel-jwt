const app = require("express")();
const { v4 } = require("uuid");
const express = require("express"),
  jwt = require("jsonwebtoken"),
  config = require("./configs/config"),
  app = express();
app.set("key", config.key);
app.use(express.urlencoded());
app.use(express.json());
app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
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
app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
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
