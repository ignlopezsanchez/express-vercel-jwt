const app = require("express")();
const { v4 } = require("uuid");

app.get("/api", (req, res) => {
  res.json({ hola: "hola" });
});

app.get("/api/users", (req, res) => {
  res.json({ pepe: "pepe" });
});

module.exports = app;
