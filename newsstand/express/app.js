const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const data = JSON.parse(fs.readFileSync("../src/data/news.json", "utf8"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/channels", (req, res) => {
  res.json(data.news);
});

app.get("/api/users/channels", (req, res) => {
  res.send(data.subscribe);
});

app.post("/api/users/channels", (req, res) => {
  const channel = {
    id: req.body.id,
  };
  data.subscribe.push(channel);
  res.send(data.subscribe);
});