import { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ListViewItem } from './ListViewItem';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

export function ListView({
	newsData,
	fetchSubscriptionData,
	setPopup,
	setSelectedPress,
}) {
	const [isActive, setIsActive] = useState(0);
	const [indicator, setIndicator] = useState(1);

	const categorizedData = Object.values(newsData).reduce((acc, cur) => {
		const category = cur.category;
		if (!acc[category]) {
			acc[category] = [];
		}
		const data = { ...cur };
		acc[category].push(data);
		return acc;
	}, {});
	// console.log('categorizedData', categorizedData);
	// 카테고리 기준으로 데이터 가공
	const categoryList = Object.entries(categorizedData);

	function handleCategoryTab(index) {
		setIsActive(index);
		setSliderPosition(categoryStartIndex[index]);
	}
	//이미지 슬라이드
	const [sliderPosition, setSliderPosition] = useState(0);

	const { totalSlides, categoryStartIndex } = categoryList.reduce(
		({ totalSlides, categoryStartIndex }, [_, items]) => {
			categoryStartIndex.push(totalSlides);
			totalSlides += items.length;
			return { totalSlides, categoryStartIndex };
		},
		{ totalSlides: 0, categoryStartIndex: [] }
	);

	// 슬라이더 이동 로직
	const moveSlider = direction => {
		if (direction === 'left' && sliderPosition > 0) {
			setSliderPosition(sliderPosition - 1);
			setIndicator(indicator - 1);
		} else if (direction === 'right' && sliderPosition < totalSlides - 1) {
			setSliderPosition(sliderPosition + 1);
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
				<StyledListViewItem>
					<StyledDiv
						style={{
							transform: `translateX(-${sliderPosition * 100}%)`, // 슬라이더 이동
							transition: 'all 0.5s',
						}}
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
					</StyledDiv>
					<StyledButton
						as={LeftOutlined}
						onClick={() => moveSlider('left')}
						disabled={sliderPosition === 0}
					/>

					<StyledButton
						as={RightOutlined}
						onClick={() => {
							moveSlider('right');
						}}
						disabled=''
					/>
				</StyledListViewItem>
			</StyledWrapper>
		</>
	);
}
const StyledDiv = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex: 0 0 100%;
`;
const StyledWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 388px;
	padding: 0;
`;
const StyledListViewItem = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;
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
const StyledButton = styled.button`
	position: absolute;
	top: 50%;
	left: -48px;
	transfor: translateY(-50%);
	font-size: 42px;
	padding: 20px 0;
	cursor: pointer;
	&:disabled {
		background-color: #ddd;
		display: none;
	}
	&:last-child {
		left: auto;
		right: -48px;
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
