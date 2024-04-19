import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import {
	ProfileTwoTone,
	AppstoreTwoTone,
	LeftOutlined,
	RightOutlined,
} from '@ant-design/icons';
import { PressItem } from './PressItem';
import { getNewsData } from '../apis/newsApiHandler';
import { chunkArray } from '../utility/utils';
import { TableLine } from './TableLine';
import { ModalUnsubscribe } from './ModalUnsubscribe';

export function PressListContainer() {
	const [newsData, setNewsData] = useState([]);
	const [activeTab, setActiveTab] = useState('news');
	const [popup, setPopup] = useState(false);
	const [selectedPress, setSelectedPress] = useState({});

	function fetchData() {
		setActiveTab('news');
		getNewsData('news').then(data => {
			setNewsData(data.news); //모든 데이터
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
				{/*  */}
				<StyledTab>
					<StyledTabItem>
						<ProfileTwoTone />
					</StyledTabItem>

					<StyledTabItem>
						<AppstoreTwoTone />
					</StyledTabItem>
				</StyledTab>
			</StyledTabWrapper>

			<StyledSwiperWrapper>
				<StyledSwiperContainer>
					<StyleTableLine />
					{newsData.length === 0 && (
						<StyledEmpty>아직 구독중인 언론사가 없어요 🧐</StyledEmpty>
					)}
					{chunkArray(newsData, 24).map((item, index) => (
						<StyledDiv key={index}>
							{item.map((data, idx) => (
								<StyledPressItem
									key={`${data.id}-${idx}`}
									pressData={data}
									fetchSubscriptionData={fetchSubscriptionData}
									handleUnsubscribe={handleUnsubscribe}
								/>
							))}
						</StyledDiv>
					))}
				</StyledSwiperContainer>
				<StyledButtonPrev>
					<LeftOutlined />
				</StyledButtonPrev>
				<StyledButtonNext>
					<RightOutlined />
				</StyledButtonNext>
			</StyledSwiperWrapper>
		</>
	);
}
const StyledTabWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: pink;
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
const StyledSwiperWrapper = styled.div`
	position: relative;
`;
const StyledSwiperContainer = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: 388px;
	overflow: hidden;
	margin: 0 auto;
	border: 1px solid blue;
`;
const StyleTableLine = styled(TableLine)`
	border: 1px solid #ebebeb;
`;
const StyledDiv = styled.div`
	position: relative;
	z-index: 2;
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: repeat(4, 1fr);
	flex-shrink: 0;
`;
const StyledPressItem = styled(PressItem)``;
const StyledEmpty = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	font-size: 30px;
	font-weight: bold;
`;

const StyledButton = styled.button`
	z-index: 3;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 40px;
	height: 90px;
	border: 1px solid blue;
`;
const StyledButtonPrev = styled(StyledButton)`
	left: -50px;
`;
const StyledButtonNext = styled(StyledButton)`
	right: -50px;
`;
