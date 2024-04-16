import { useState } from 'react';
import { postNewsData } from '../apis/getNewsData';
import { styled } from 'styled-components';
export function ButtonSubscribe({ parentFn }) {
	const [isSubscribe, setIsSubscribe] = useState(false);

	async function handleSubscribe(e) {
		const targetImg = e.target.closest('div').querySelector('img').alt;
		parentFn();
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
