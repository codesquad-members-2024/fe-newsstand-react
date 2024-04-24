import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ListViewItem } from './ListViewItem';
import { Slider } from './Slider';

export function ListView({
	newsData,
	fetchSubscriptionData,
	setPopup,
	setSelectedPress,
}) {
	const [isActive, setIsActive] = useState(0);
	const [indicator, setIndicator] = useState(1);
	const [sliderPosition, setSliderPosition] = useState(0);
	const categorizedData = Object.values(newsData).reduce((acc, cur) => {
		const category = cur.category;
		if (!acc[category]) {
			acc[category] = [];
		}
		const data = { ...cur };
		acc[category].push(data);
		return acc;
	}, {});

	// 카테고리 기준으로 데이터 가공
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

	const tabIndicator = direction => {
		if (direction === 'left') {
			setIndicator(indicator - 1);
		} else if (direction === 'right') {
			setIndicator(indicator + 1);
		}
	};

	return (
		<>
			{!newsData && <div>~ l o a d i n g ~</div>}
			<StyledWrapper>
				<StyledCatetoryList>
					{categoryList.map(([category, counts], index) => (
						<StyledCategoryTab
							key={index + category}
							onClick={() => handleCategoryTab(index)}
							$isActive={isActive === index}
						>
							{category}

							{isActive === index && (
								<strong>
									<span>{`${indicator}`}</span>/{`${counts.length}`}
								</strong>
							)}
						</StyledCategoryTab>
					))}
				</StyledCatetoryList>
				<StyledListViewItem
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

const StyledWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 388px;
	padding: 0;
`;
const StyledListViewItem = styled(Slider)``;

const StyledCatetoryList = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
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
    transition: padding .5s;
    background: #F5F7F9;
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
				animation: ${AnimationFill} 20s forwards;
			`}
    }
`;

const AnimationFill = keyframes`
    from {
        background-position: right bottom; 
    }
    to {
        background-position: left bottom;
    }
`;
