import { message } from 'antd';

export async function getNewsData(viewType = 'news') {
	try {
		const response = await fetch(
			`http://localhost:3001/server/datas/${viewType}`
		); // 요청 보내기
		const data = await response.json(); // 응답을 JSON으로 변환
		return data; // 변환된 데이터 반환
	} catch (error) {
		console.error('Failed to fetch images:', error);
		return []; //TODO: 에러처리 이게 최선인가?
	}
}

//POST 요청을 보내는 함수
export async function postNewsData(newsData) {
	try {
		const response = await fetch('http://localhost:3001/server/datas/news', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newsData), // JavaScript 객체 -> JSON 문자열로 변환
		});
		const data = await response.json(); // 서버로부터의 응답 -> JSON으로 변환
		message.success({
			content: '내가 구독한 언론사에 추가되었습니다 💾',
			duration: 5,
		});
		return data; // 응답 받은 데이터 반환
	} catch (error) {
		message.error({
			content: '데이터를 저장하는데 실패했습니다 😭',
			duration: 5,
		});
	}
}

export async function deleteNewsData(newsData) {
	try {
		const response = await fetch();
	} catch (error) {
		console.error('Failed to delete news data:', error);
	}
}
