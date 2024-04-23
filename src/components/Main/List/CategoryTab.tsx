import { useState } from "react";

interface Props {
	currCategory: string;
}

const TotalCategory = ({ currCategory }: Props) => {
	const categories = [
		"종합/경제",
		"방송/통신",
		"IT",
		"영자지",
		"스포츠/연예",
		"매거진/전문지",
		"지역",
	];
	const style = "pr-14 text-white bg-news-blue/40";
	return (
		<>
			{categories.map((category, i) => (
				<li
					className={`relative mr-2 cursor-pointer transition-[padding] ease-in-out duration-500 h-[106%] ${
						category === currCategory ? style : ""
					}`}
					key={i}
				>
					<span
						className={`relative text-news-gray text-sm flex m-2 z-10 ${
							category === currCategory ? "text-white" : ""
						}`}
					>
						{category}
					</span>
					{category === currCategory ? (
						<span className="absolute top-0 h-full z-0 bg-news-blue w-full animate-fill"></span>
					) : (
						""
					)}
				</li>
			))}
		</>
	);
};

function CategoryTab() {
	const [currCategory, setCurrCategory] = useState("종합/경제");
	const onClick = ({ target }: React.MouseEvent<HTMLElement>) => {
		const $target = target as HTMLElement;
		const $li = $target.closest("li") as HTMLElement;
		if ($li) setCurrCategory($li.innerText);
	};
	return (
		<ul
			onClick={onClick}
			className="bg-customGray flex items-center border-b-2 h-10"
			role="tablist"
		>
			<TotalCategory currCategory={currCategory} />
		</ul>
	);
}

export default CategoryTab;
