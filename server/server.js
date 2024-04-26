import cors from 'cors';
import express from 'express';
import path from 'path';
import process from 'process';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
	//cors 는 node의 추가 모듈임
	cors({
		origin: 'http://localhost:5173', // 이 도메인만 CORS 요청을 허용
	})
);
app.use(express.json());
// Vite가 빌드한 정적 파일을 제공
app.use(express.static('dist'));
// API 라우트 정의

// 뉴스 데이터를 반환하는 GET 라우트 추가
app.get('/server/datas/:type', async (req, res) => {
	const { type } = req.params; // URL에서 파일 유형을 파라미터로 받기
	try {
		const filePath = path.resolve('server/datas', `${type}.json`); // 동적 파일 경로
		const data = await fs.readFile(filePath, 'utf8');
		res.json(JSON.parse(data));
	} catch (error) {
		res.status(500).send({ error: `Failed to load ${type}.` });
	}
});

// news 데이터를 받아서 파일에 저장하는 POST 라우트 추가
app.post('/server/datas/news', async (req, res) => {
	const newsData = req.body; // 요청 본문에서 데이터 추출
	const filePath = path.resolve('server/datas', 'news.json');
	try {
		const fileData = await fs.readFile(filePath, 'utf8');
		const jsonData = JSON.parse(fileData);
		jsonData.news.find(item => {
			if (item.id === newsData.id) {
				item.isSubscribed = !item.isSubscribed;
			}
		});
		// 변경된 데이터를 다시 파일에 쓰기
		await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
		res.status(201).send({ meapfssage: '구독중 상태로 변경' });
	} catch (error) {
		console.error('Failed to update file:', error);
		res.status(500).send({ error: 'Failed to update subscribe data.' });
	}
});

app.delete('/server/datas/news', async (req, res) => {
	const newsData = req.body;

	const filePath = path.resolve('server/datas', 'news.json');
	try {
		const fileData = await fs.readFile(filePath, 'utf8');
		const jsonData = JSON.parse(fileData);
		jsonData.news.find(item => {
			if (item.id === newsData.id) {
				item.isSubscribed = !item.isSubscribed;
			}
		});
		// 변경된 데이터를 다시 파일에 쓰기
		await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
		res.status(200).send({ meapfssage: '해지 상태로 변경' });
	} catch (error) {
		console.error('Failed to update file:', error);
		res.status(500).send({ error: 'Failed to update subscribe data.' });
	}
});

// 모든 라우트 처리를 React 앱으로 리다이렉트
app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.dirname(''), 'dist', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
