import { createContext, useState, useEffect } from "react";

interface Props {
	children: React.ReactNode;
}
const SERVER = process.env.REACT_APP_JSON_SERVER;
const NewsContext = createContext<[News[], {}]>([[], {}]);

const APIs = {
	CATEGORY_ECONOMY: `${SERVER}/news?category=종합/경제`,
	CATEGORY_FINANCE: `${SERVER}/news?category=방송/통신`,
	CATEGORY_IT: `${SERVER}/news?category=IT`,
	CATEGORY_ENGLISH_NEWS: `${SERVER}/news?category=영자지`,
	CATEGORY_SPORTS: `${SERVER}/news?category=스포츠/연예`,
	CATEGORY_MAGAZINE: `${SERVER}/news?category=매거진/전문지`,
	CATEGORY_REGION: `${SERVER}/news?category=지역`,
};

function NewsProvider({ children }: Props) {
	const [news, setNews] = useState<News[]>([]);
	const [categoryLength, setCategoryLength] = useState<{}>({});

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const res = await fetch(`${SERVER}/news`);
				const news = await res.json();
				setNews(news);
			} catch (error) {
				console.error(error);
			}
		};
		fetchNews();
	}, []);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const res = Object.values(APIs).map((api) => fetch(api));
				const promiseRes = await Promise.all(res);
				for (const promise of promiseRes) {
					const category = await promise.json();
					setCategoryLength((prev) =>
						Object.assign(prev, { [category[0].category]: category.length })
					);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchNews();
	}, []);

	return <NewsContext.Provider value={[news, categoryLength]}>{children}</NewsContext.Provider>;
}

export { NewsContext, NewsProvider };
