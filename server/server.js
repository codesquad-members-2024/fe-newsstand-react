import express from 'express';
import fs from 'fs';
import cors from "cors";
import latestNews from "./latestNews.json" assert{ type: "json"};
import newsData from "./news.json" assert{ type: "json"};

const app = express();
const port = 4000;

app.use(cors());
app.get('/news', (req, res) => {
    fs.readFile('./news.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(newsData);
    });
});

app.get('/latestNews', (req, res) => {
    fs.readFile('./latestNews.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(latestNews);
    });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
