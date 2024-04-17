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
		return data; // 응답 받은 데이터 반환
	} catch (error) {
		console.error('Failed to post news data:', error);
	}
}
