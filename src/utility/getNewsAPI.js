export const jsonParser = {
    async getNewsData(tableName) {
        const news = await fetch(`http://localhost:4000/${tableName}`)
        const data = await news.json()
        return data
    }
}