import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ListViewItem } from './ListViewItem';

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
					{Object.values(categorizedData).map((item, index) => (
						<ListViewItem key={index} categorizedData={item} />
					))}
				</StyledListViewItem>
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
	width: 100%;
	height: 388px;
	padding: 0;
`;
const StyledListViewItem = styled.div`
	border: 5px dashed olive;
	display: flex;
	width: 100%;
	height: 100%;
	// overflow: hidden;
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

const AnimationFill = keyframes`
    from {
        background-position: right bottom; 
    }
    to {
        background-position: left bottom;
    }
`;
