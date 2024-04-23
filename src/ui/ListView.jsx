import { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ListViewItem } from './ListViewItem';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

export function ListView({ newsData }) {
	const [isActive, setIsActive] = useState(0);
	function handleCategoryTab(index) {
		setIsActive(index);
	}

	const categorizedData = Object.values(newsData).reduce((acc, cur) => {
		const category = cur.category;
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(cur);
		return acc;
	}, {});
	const categoryList = Object.entries(categorizedData);

	//이미지 슬라이드
	const [sliderPosition, setSliderPosition] = useState(0);

	// 슬라이더 이동 로직
	const moveSlider = direction => {
		if (direction === 'left' && sliderPosition > 0) {
			setSliderPosition(sliderPosition - 1); // 왼쪽으로 이동
		} else if (
			direction === 'right' &&
			sliderPosition <
				categoryList.reduce((total, [_, items]) => total + items.length, 0) - 1
		) {
			setSliderPosition(sliderPosition + 1); // 오른쪽으로 이동
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
							{/* //TODO: ${1} 동적으로 받도록 수정 (스와이퍼 연동) */}
							{isActive === index && (
								<strong>
									<span>{`${1}`}</span>/{`${counts.length}`}
								</strong>
							)}
						</StyledCategoryTab>
					))}
				</StyledCatetoryList>
				<StyledListViewItem>
					<StyledDiv
						style={{
							transform: `translateX(-${sliderPosition * 100}%)`, // 슬라이더 이동
							transition: 'transform 0.5s ease-in-out', // 부드러운 이동 효과
						}}
					>
						{Object.values(categorizedData).map((item, index) => (
							<ListViewItem key={index} categorizedData={item} />
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
	border: 5px dashed olive;
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
	left: -20px;
	transfor: translateY(-50%);
	background-color: #fff;
	font-size: 42px;
	padding: 20px 0;
	cursor: pointer;
	&:disabled {
		background-color: #ddd;
		display: none;
	}
	&:last-child {
		left: auto;
		right: -20px;
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
