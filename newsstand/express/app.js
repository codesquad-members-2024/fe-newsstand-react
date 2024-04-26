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

data.news.forEach((item) => (item.userSubscribed = false));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/channels", (req, res) => {
  res.json(data.news);
});

app.get("/api/users/channels", (req, res) => {
  res.send(data.news.filter((item) => data.subscribe.includes(item.id)));
});

app.post("/api/users/channels", (req, res) => {
  console.log("post " + req.body.id);

  if (!data.subscribe.includes(req.body.id)) {
    data.subscribe.push(req.body.id);
    const newsItem = data.news.find((item) => item.id === req.body.id);
    if (newsItem) newsItem.userSubscribed = true;
  }

  res.send(data.subscribe);
});

app.delete("/api/users/channels", (req, res) => {
  console.log("delete " + req.body.id);
  const index = data.subscribe.indexOf(req.body.id);
  if (index > -1) {
    data.subscribe.splice(index, 1);
    const newsItem = data.news.find((item) => item.id === req.body.id);
    if (newsItem) newsItem.userSubscribed = false;
  }
  res.send(data.subscribe);
});
