import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { ProfileTwoTone, AppstoreTwoTone } from '@ant-design/icons';

import { getNewsData } from '../apis/newsApiHandler';

import { ModalUnsubscribe } from './ModalUnsubscribe';
import { ListView } from './ListView';
import { GridView } from './GridView';
import { shuffleArray } from '../utility/utils';

export function PressListContainer() {
	const [newsData, setNewsData] = useState([]);
	const [activeTab, setActiveTab] = useState('');
	const [popup, setPopup] = useState(false);
	const [viewType, setViewType] = useState('grid');
	const [selectedPress, setSelectedPress] = useState({});

	//전체 언론사 데이터 가져오기
	function fetchData() {
		setActiveTab('news');
		getNewsData('news').then(data => {
			setNewsData(data.news);
		});
	}

	//구독한 언론사 데이터 가져오기
	function fetchSubscriptionData() {
		setActiveTab('subscription');
		getNewsData('news').then(
			data => setNewsData(data.news.filter(item => item.isSubscribed)) //구독한 데이터
		);
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
						$activeTab={activeTab === 'news'}
						onClick={() => fetchData()}
					>
						전체 언론사
					</StyledTabItem>
					<StyledTabItem
						$activeTab={activeTab === 'subscription'}
						onClick={() => fetchSubscriptionData()}
					>
						구독한 언론사
					</StyledTabItem>
				</StyledTab>

				<StyledTab>
					<StyledTabItem
						onClick={() => {
							setViewType('list');
						}}
						$activeView={viewType === 'list'}
					>
						<ProfileTwoTone />
					</StyledTabItem>

					<StyledTabItem
						onClick={() => {
							setViewType('grid');
						}}
						$activeView={viewType === 'grid'}
					>
						<AppstoreTwoTone />
					</StyledTabItem>
				</StyledTab>
			</StyledTabWrapper>
			{viewType === 'grid' ? (
				<GridView
					newsData={shuffleArray(newsData)}
					fetchSubscriptionData={fetchSubscriptionData}
					setPopup={setPopup}
					setSelectedPress={setSelectedPress}
					activeTab={activeTab}
				/>
			) : (
				<ListView
					newsData={newsData}
					activeTab={activeTab}
					fetchSubscriptionData={fetchSubscriptionData}
					setPopup={setPopup}
					setSelectedPress={setSelectedPress}
				/>
			)}
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
	filter: ${props => (props.$activeView ? 'grayscale(0)' : 'grayscale(1)')};
	color: ${props => (props.$activeTab ? '#14212B' : '#879298')};
	font-weight: ${props => (props.$activeTab ? 'bold' : 'normal')};
`;
