export async function getImages() {
	try {
		const response = await fetch('http://localhost:3001/server/datas/images'); // 요청 보내기
		const data = await response.json(); // 응답을 JSON으로 변환
		return data; // 변환된 데이터 반환
	} catch (error) {
		console.error('Failed to fetch images:', error); // 오류 처리
		return []; // 오류 발생 시 빈 배열 반환
	}
}
