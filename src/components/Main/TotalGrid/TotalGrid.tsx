import { useState, useContext, useEffect } from "react";
import { NewsContext } from "../../../NewsProvider";
import { ViewContext } from "../ViewProvider";
import Swiper from "../shared-components/Swiper";
import { Subscription, Unsubscription } from "../shared-components/Subscription";
import { handleSubscription } from "../../../utility/subscription";

const GRID_TOTAL_NUM = 96;
const CELL_COUNT = 24;
const ZERO = 0;
const LAST_PAGE = 3;

const getTotalGridNews = (news: News[]) => news.slice(ZERO, GRID_TOTAL_NUM); //.sort(() => Math.random() - 0.5);

function TotalGrid() {
	const [, dispatch] = useContext(ViewContext);
	const [news] = useContext(NewsContext);
	const [currentPage, setCurrentPage] = useState<number>(ZERO);
	const [target, setTarget] = useState<News | null>(null);
	if (!news.length) return <></>;

	const startIdx = currentPage * CELL_COUNT;
	const gridNews = getTotalGridNews(news);
	return (
		<>
			<div
				onClick={(e) => handleSubscription(e, setTarget, dispatch)}
				className="border-t-2 border-l-2 border-customGray dark:border-white/40 h-full grid grid-rows-4 grid-cols-6"
			>
				{Array.from({ length: CELL_COUNT }).map((_, i) => {
					const currNews = gridNews[startIdx + i];
					return (
						<div
							key={currNews.id}
							className="group border-b-2 border-r-2 border-customGray flex justify-center items-center hover:bg-news-gray/10 dark:border-white/40 dark:hover:bg-news-gray/30"
						>
							<img
								className="h-6 relative group-hover:opacity-0"
								src={currNews.logoImageSrc}
								alt={currNews.pressName}
							></img>
							<button
								id={currNews.id}
								className="absolute opacity-0 text-gray-400 group-hover:opacity-100 border-2 text-xs rounded-xl px-2 py-0.5 bg-white dark:bg-white/100"
							>
								{currNews.subscription ? "해지하기" : "+"}
							</button>
						</div>
					);
				})}
			</div>
			<Swiper
				lastPage={LAST_PAGE}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				isGrid={true}
			/>
			{target &&
				(target.subscription ? (
					<Unsubscription target={target} setTarget={setTarget} />
				) : (
					<Subscription />
				))}
		</>
	);
}

export default TotalGrid;
