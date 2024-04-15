/**
 * 필요한 state
 * - 구독여부
 * 부모로부터 구독여부 함수 boolean props로 받아옴
 */

import { styled } from 'styled-components';
export function ButtonSubscribe({ isSubscribed = false }) {
	return (
		<StyledButton>{isSubscribed ? '- 해지하기' : '+ 구독하기'}</StyledButton>
	);
}

const StyledButton = styled.button`
	cursor: pointer;
	height: 24px;
	padding: 0 6px;
	border-radius: 20px;
	text-align: center;
	border: 1px solid #d2dae0;
	color: #879298;
	font-size: 12px;
	line-height: 24px;
	font-weight: 500;
	background-color: #fff;
`;
