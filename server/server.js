import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import latestNews from "./latestNews.json" assert { type: "json" };
import newsData from "./news.json" assert { type: "json" };
import News from "./Models/newsSchema.js";
import RollingNews from "./Models/rollingNewsSchema.js";
import SubscribeList from "./Models/subscribeSchema.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MongoDB)
    .then(() => console.log("연결완료"))
    .catch(() => console.log("실패"));


const db = mongoose.connection;
db.on('error', function(){
    console.log('Connection Failed!');
});

db.once('open', async function() {
    console.log('Connected!');
    await initDB();
});

const initDB = async () => {
    // await News.deleteMany({});
    // await RollingNews.deleteMany({});
    // await SubscribeList.deleteMany({});
    try {
        const dbCount = await News.countDocuments();
        const latestDbCount = await RollingNews.countDocuments();

        if (dbCount === 0) await News.insertMany(newsData.news);
        if (latestDbCount === 0) await RollingNews.insertMany(latestNews.news);
    } catch (error) {
        console.error(error);
    }
}

app.get('/news', async (req, res) => {
    try {
        const newsData = await News.find();
        res.json(newsData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get("/latestNews", async(req, res) => {
    try {
        const latestData = await RollingNews.find();
        res.json(latestData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get("/subscribeInfo", async(req, res) => {
    try {
        const subscribeData = await SubscribeList.find();
        res.json(subscribeData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/subscribeInfo', async (req, res) => {
    try {
        const selectData = req.body;
        const newSubscriber = new SubscribeList(selectData);
        await newSubscriber.save();
        res.status(201).json({ message: "구독자 추가 성공", data: newSubscriber });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/subscribeInfo/:pressName', async (req, res) => {
    const pressName = req.params.pressName;
    try {
        const result = await SubscribeList.deleteMany({ pressName: pressName });
        res.json({ message: `Successfully deleted documents with pressName: ${pressName}`, result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
