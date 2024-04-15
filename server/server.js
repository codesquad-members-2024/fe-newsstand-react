import cors from 'cors';
import express from 'express';
import path from 'path';
import process from 'process';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
	cors({
		origin: 'http://localhost:5173', // 이 도메인만 CORS 요청을 허용
	})
);
app.use(express.json());
// Vite가 빌드한 정적 파일을 제공
app.use(express.static('dist'));
// API 라우트 정의
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
	const newSubscriber = req.body; // 요청 본문에서 데이터 추출

	const filePath = path.resolve('server/datas', 'news.json');
	try {
		const fileData = await fs.readFile(filePath, 'utf8');
		const jsonData = JSON.parse(fileData);

		// 'subscribe' 배열에 새 구독자 추가
		jsonData.subscribe.push(newSubscriber);

		// 변경된 데이터를 다시 파일에 쓰기
		await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
		console.log('Saved data:', jsonData.subscribe);

		res.status(201).send({ message: 'Subscriber added successfully!' });
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
