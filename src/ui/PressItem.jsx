import { styled } from 'styled-components';
import { postNewsData } from '../apis/getNewsData';

import { ButtonSubscribe } from './ButtonSubscribe';

export function PressItem({ className, pressData }) {
	function handlePost() {
		// ButtonSubscribe 컴포넌트에서 호출하는 함수, 해당하는 객체를 받음
		const subscribeArray = [];
		subscribeArray.push(pressData);
		postNewsData(...subscribeArray);
	}

	return (
		<StyledWrapper className={className}>
			<img src={pressData.logoImageSrc} alt={pressData.pressName} />
			<StyledHover>
				<ButtonSubscribe handlePost={handlePost} />
			</StyledHover>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	cursor: pointer;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover > span {
		opacity: 1;
	}
	img {
		width: 50%;
	}
`;

const StyledHover = styled.span`
	display: flex;
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #f5f7f9;
	justify-content: center;
	align-items: center;
	transition: opacity 0.3s;
`;
