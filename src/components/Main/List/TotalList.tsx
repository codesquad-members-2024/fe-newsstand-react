import { useContext, useState } from "react";
import { NewsContext } from "../../../NewsProvider";
import CategoryTab from "./CategoryTab";
import SingleNews from "./SingleNews/SingleNews";
import Swiper from "../Swiper/Swiper";

const ZERO = 0;
const LAST_PAGE = 214;

function TotalList() {
	const [news] = useContext(NewsContext);
	const [currentPage, setCurrentPage] = useState<number>(ZERO);
	if (!news.length) return <></>;
	return (
		<>
			<div className="border-2 border-customGray dark:border-white/40 h-full">
				<CategoryTab />
				<SingleNews singleNews={news[currentPage]}></SingleNews>
			</div>
			<Swiper
				lastPage={LAST_PAGE}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				isGrid={false}
			></Swiper>
		</>
	);
}

export default TotalList;
