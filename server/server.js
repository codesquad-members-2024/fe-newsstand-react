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
// 모든 라우트 처리를 React 앱으로 리다이렉트
app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.dirname(''), 'dist', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
