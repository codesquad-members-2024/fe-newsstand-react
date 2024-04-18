import express from 'express';
import fs from 'fs';
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.get('/news', (req, res) => {
    fs.readFile('./news.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.get('/latestNews', (req, res) => {
    fs.readFile('./latestNews.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
