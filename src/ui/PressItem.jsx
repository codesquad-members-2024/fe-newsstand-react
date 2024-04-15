import { styled } from 'styled-components';

import { ButtonSubscribe } from './ButtonSubscribe';

export function PressItem({
	className,
	pressData,
	isSubscribed,
	handleSubscribe,
}) {
	return (
		<StyledWrapper className={className}>
			<img src={pressData.logoImageSrc} alt={pressData.pressName} />
			<StyledHover>
				<ButtonSubscribe
					handleSubscribe={handleSubscribe}
					isSubscribed={isSubscribed}
				/>
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
