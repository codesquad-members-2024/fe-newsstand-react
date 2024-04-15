// 배열과 chunkSize를 받아서 총 페이지 수를 반환하고 페이지 수를 토대로 배열을 나눠서 반환하는 함수
export const chunkArray = (array, chunkSize) => {
	const pages = Math.ceil(array.length / chunkSize);
	const result = [];
	for (let i = 0; i < pages; i++) {
		result.push(array.slice(i * chunkSize, (i + 1) * chunkSize));
	}
	return result;
};
// 배열을 섞어주는 함수
export const shuffleArray = array => array.sort(() => Math.random() - 0.5);
