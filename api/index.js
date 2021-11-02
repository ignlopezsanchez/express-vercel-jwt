import express, { urlencoded, json } from "express";
import { sign } from "jsonwebtoken";
import { key } from "./configs/config";
const app = express();
app.set("key", key);
app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/api", (req, res) => {
  res.json({ hola: "pepe" });
});

/* const protectedRoutes = express.Router();
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
*/

app.post("/api/login", (req, res) => {
  console.log("body ", req.body);
  if (req.body.user === "mock_user" && req.body.password === "mock_password") {
    const payload = {
      check: true,
    };
    const token = sign(payload, app.get("key"), {
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
app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Asfo" },
    { id: 2, name: "Denisse" },
    { id: 3, name: "Carlos" },
  ];

  res.json(users);
});
export default app;
