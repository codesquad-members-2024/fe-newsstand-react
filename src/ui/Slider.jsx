import styled from 'styled-components';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

export function Slider({
	children,
	className,
	totalSlides,
	categoryStartIndex = [],
	tabIndicator,
	sliderPosition,
	setSliderPosition,
	autoSlide = false,
}) {
	const moveSlider = direction => {
		if (direction === 'left' && sliderPosition > 0) {
			setSliderPosition(sliderPosition - 1);
			categoryStartIndex.length > 0 && tabIndicator('left');
		} else if (direction === 'right' && sliderPosition < totalSlides - 1) {
			setSliderPosition(sliderPosition + 1);
			categoryStartIndex.length > 0 && tabIndicator('right');
		}
	};
	let intervalId;
	const interval = () => {
		intervalId = intervalId = setInterval(() => {
			moveSlider('right');
		}, 20000);
	};
	useEffect(() => {
		if (autoSlide && sliderPosition < totalSlides - 1) {
			interval();
		} else if (sliderPosition === totalSlides - 1) {
			clearInterval(interval);
		}
		return () => {
			clearInterval(intervalId);
		};
	}, [sliderPosition]);
	return (
		<StyledWrapper className={className}>
			<StyledDiv
				style={{
					transform: `translateX(-${sliderPosition * 100}%)`, // 슬라이더 이동
					transition: 'all 0.5s',
				}}
			>
				{children}
			</StyledDiv>
			<StyledButton
				onClick={() => moveSlider('left')}
				disabled={sliderPosition === 0}
			>
				<LeftOutlined />
			</StyledButton>

			<StyledButton
				onClick={() => {
					moveSlider('right');
				}}
				disabled={sliderPosition === totalSlides - 1}
			>
				<RightOutlined />
			</StyledButton>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;
const StyledDiv = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex: 0 0 100%;
`;
const StyledButton = styled.button`
	position: absolute;
	top: 50%;
	left: -48px;
	transform: translateY(-50%);
	font-size: 42px;
	padding: 20px 0;
	cursor: pointer;
	&:last-child {
		left: auto;
		right: -48px;
	}
	&:disabled {
		display: none;
	}
`;
