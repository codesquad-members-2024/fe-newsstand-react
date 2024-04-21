export const jsonParser = {
    async getNewsData(tableName) {
        const serverURL = process.env.REACT_APP_SERVER;
        const news = await fetch(serverURL + tableName);
        const data = await news.json();
        return data;
    },

    async postNewsData(pressInfo) {
        const serverURL = process.env.REACT_APP_SERVER;
        fetch(serverURL + "subscribeInfo", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(pressInfo),
        });
    },
};
