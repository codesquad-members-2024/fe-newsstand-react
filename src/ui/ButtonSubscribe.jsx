import { useState } from 'react';

import { styled } from 'styled-components';
export function ButtonSubscribe({ handlePost }) {
	const [isSubscribe, setIsSubscribe] = useState(false);

	async function handleSubscribe() {
		handlePost();
		setIsSubscribe(!isSubscribe);
	}

	return (
		<StyledButton onClick={handleSubscribe}>
			{isSubscribe ? '- 해지하기' : '+ 구독하기'}
		</StyledButton>
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
