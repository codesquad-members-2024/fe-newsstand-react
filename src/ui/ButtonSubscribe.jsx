import { styled } from 'styled-components';
import { postNewsData } from '../apis/newsApiHandler';
export function ButtonSubscribe({
	pressData,
	fetchSubscriptionData,
	setSelectedPress,
	setPopup,
}) {
	function handler(target, status = false) {
		if (!target) return;
		if (status) {
			setSelectedPress(target);
			setPopup(true);
		} else {
			postNewsData(pressData) //
				.then(() => fetchSubscriptionData());
		}
	}

	return (
		<StyledButton
			onClick={() => {
				handler(pressData, pressData.isSubscribed);
			}}
		>
			{pressData.isSubscribed ? '- 해지하기' : '+ 구독하기'}
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
