import { styled } from 'styled-components';

export function TableLine({ className }) {
	return (
		<StyledWrapper className={className}>
			<StyledHorizontal $top={25}></StyledHorizontal>
			<StyledHorizontal $top={50}></StyledHorizontal>
			<StyledHorizontal $top={75}></StyledHorizontal>
			<StyledVertical $left={154}></StyledVertical>
			<StyledVertical $left={309}></StyledVertical>
			<StyledVertical $left={464}></StyledVertical>
			<StyledVertical $left={619}></StyledVertical>
			<StyledVertical $left={774}></StyledVertical>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	& > i {
		position: absolute;
		background-color: #ebebeb;
	}
`;
const StyledHorizontal = styled.i`
	top: ${({ $top }) => $top}%;
	left: 0;
	height: 1px;
	width: 100%;
`;
const StyledVertical = styled.i`
	top: 0;
	left: ${({ $left }) => $left}px;
	width: 1px;
	height: 100%;
`;
