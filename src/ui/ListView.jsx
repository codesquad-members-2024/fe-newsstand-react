import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ListViewItem } from './ListViewItem';
import { Slider } from './Slider';

export function ListView({
	newsData,
	fetchSubscriptionData,
	setPopup,
	setSelectedPress,
	activeTab = 'subscription',
}) {
	const [isActive, setIsActive] = useState(0);
	const [indicator, setIndicator] = useState(1);
	const [sliderPosition, setSliderPosition] = useState(0);
	useEffect(() => {
		setSliderPosition(0);
		setIndicator(1);
		handleCategoryTab(0);
	}, [activeTab]); // activeTab이 변경될 때마다 실행
	const categorizedData = Object.values(newsData).reduce((acc, cur) => {
		const category = cur.category;
		const pressName = cur.pressName;

		//구독한 언론사들
		if (activeTab === 'subscription' && cur.isSubscribed) {
			if (!acc[pressName]) {
				acc[pressName] = [];
			}
			const data = { ...cur };
			acc[pressName].push(data);
		} else {
			if (!acc[category]) {
				acc[category] = [];
			}
			const data = { ...cur };
			acc[category].push(data);
		}
		return acc;
	}, {});

	const categoryList = Object.entries(categorizedData);

	function handleCategoryTab(index) {
		setIsActive(index);
		setSliderPosition(categoryStartIndex[index]);
	}

	const { totalSlides, categoryStartIndex } = categoryList.reduce(
		({ totalSlides, categoryStartIndex }, [_, items]) => {
			categoryStartIndex.push(totalSlides);
			totalSlides += items.length;
			return { totalSlides, categoryStartIndex };
		},
		{ totalSlides: 0, categoryStartIndex: [] }
	);

	const tabIndicator = direction =>
		setIndicator(indicator + (direction === 'left' ? -1 : 1));

	return (
		<>
			{!newsData && <div>~ l o a d i n g ~</div>}
			<StyledWrapper>
				<StyledCatetoryList>
					{Object.keys(categorizedData).map((item, index) => (
						<StyledCategoryTab
							key={index + item}
							onClick={() => handleCategoryTab(index)}
							$isActive={isActive === index}
						>
							{item}
							{isActive === index && activeTab !== 'subscription' && (
								<strong>
									<span>{`${indicator}`}</span>/
									{Object.values(categorizedData)[index].length}
								</strong>
							)}
						</StyledCategoryTab>
					))}
				</StyledCatetoryList>
				<StyledListViewItem
					autoSlide={true}
					totalSlides={totalSlides}
					categoryStartIndex={categoryStartIndex}
					tabIndicator={tabIndicator}
					sliderPosition={sliderPosition}
					setSliderPosition={setSliderPosition}
				>
					{Object.values(categorizedData).map((item, index) => (
						<ListViewItem
							key={index}
							categorizedData={item}
							fetchSubscriptionData={fetchSubscriptionData}
							setPopup={setPopup}
							setSelectedPress={setSelectedPress}
						/>
					))}
				</StyledListViewItem>
			</StyledWrapper>
		</>
	);
}
const AnimationFill = keyframes`
    from {
        background-position: right bottom; 
    }
    to {
        background-position: left bottom;
    }
`;
const StyledWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 388px;
	padding: 0;
`;
const StyledCatetoryList = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	height: 40px;
	background: #f5f7f9;
	border: 1px solid #d2dae0;
	border-bottom: none;
`;
const StyledCategoryTab = styled.button`
    position: relative;
    z-index: 2;
	height: 100%;
	font-size: 14px;
	color: #879298;
	padding: 0 16px;
    cursor: pointer; 
    font-weight: 700;
    transition: padding-right .5s;    
	animation: ${AnimationFill} 20s forwards infinite;
	animation-play-state: paused;
	
    strong {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        font-size: 12px;
        color: rgba(245,245,245,0.7);
        font-weight: 700;
        span {
            color: #fff;
        }
    }
    ${props =>
			props.$isActive &&
			css`
				color: #fff;
				padding-right: 88px;
				background: #7890e7;
				background-image: linear-gradient(90deg, #4362d0 50%, #7890e7 50%);
				background-position: right bottom;
				background-size: 200% 100%;
				animation-play-state: running;
			`}
    }
`;
const StyledListViewItem = styled(Slider)`
	height: 344px;
	border: 1px solid #d2dae0;
`;
