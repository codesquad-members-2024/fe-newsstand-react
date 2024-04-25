import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import latestNews from "./latestNews.json" assert { type: "json" };
import newsData from "./news.json" assert { type: "json" };

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const subscriptions = [];

app.get("/news", (req, res) => {
    res.json(newsData);
});

app.get("/latestNews", (req, res) => {
    res.json(latestNews);
});

app.get("/subscribeInfo", (req, res) => {
    res.json(subscriptions);
});

app.post("/subscribeInfo", (req, res) => {
    const requestData = req.body;
    subscriptions.push(requestData);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
