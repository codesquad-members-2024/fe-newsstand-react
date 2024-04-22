import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { ProfileTwoTone, AppstoreTwoTone } from '@ant-design/icons';

import { getNewsData } from '../apis/newsApiHandler';

import { ModalUnsubscribe } from './ModalUnsubscribe';
import { ListView } from './ListView';
import { GridView } from './GridView';

export function PressListContainer() {
	const [newsData, setNewsData] = useState([]);
	const [activeTab, setActiveTab] = useState('news');
	const [popup, setPopup] = useState(false);
	const [selectedPress, setSelectedPress] = useState({});

	function fetchData() {
		setActiveTab('news');
		getNewsData('news').then(data => {
			setNewsData(data.news);
		});
	}

	function fetchSubscriptionData() {
		setActiveTab('subscription');
		getNewsData('news').then(
			data => setNewsData(data.news.filter(item => item.isSubscribed)) //구독한 데이터
		);
	}
	function handleUnsubscribe(pressData) {
		setSelectedPress(pressData);
		setPopup(true);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			{popup && (
				<ModalUnsubscribe
					selectedPress={selectedPress}
					setPopup={setPopup}
					fetchData={fetchData}
				/>
			)}
			<StyledTabWrapper>
				<StyledTab>
					<StyledTabItem
						onClick={() => fetchData()}
						$activeTab={activeTab === 'news'}
					>
						전체 언론사
					</StyledTabItem>
					<StyledTabItem
						onClick={() => fetchSubscriptionData()}
						$activeTab={activeTab === 'subscription'}
					>
						구독한 언론사
					</StyledTabItem>
				</StyledTab>

				<StyledTab>
					<StyledTabItem>
						<ProfileTwoTone />
					</StyledTabItem>

					<StyledTabItem>
						<AppstoreTwoTone />
					</StyledTabItem>
				</StyledTab>
			</StyledTabWrapper>
			<GridView
				newsData={newsData}
				handleUnsubscribe={handleUnsubscribe}
				fetchSubscriptionData={fetchSubscriptionData}
			/>
			<ListView newsData={newsData} />
		</>
	);
}
const StyledTabWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	// background-color: pink;
`;
const StyledTab = styled.div`
	margin: 20px 0;
	display: flex;
`;
const StyledTabItem = styled.button`
	cursor: pointer;
	font-size: 16px;
	margin-right: 24px;
	background: none;
	outline: none;
	border: none;
	color: ${props => (props.$activeTab ? '#14212B' : '#879298')};
	font-weight: ${props => (props.$activeTab ? 'bold' : 'normal')};
`;
