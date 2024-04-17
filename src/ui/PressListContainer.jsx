import { styled } from 'styled-components';
import { PressItem } from './PressItem';
import { useEffect, useState } from 'react';
import { getNewsData } from '../apis/newsApiHandler';
import { chunkArray } from '../utility/utils';

export function PressListContainer() {
	const [newsData, setNewsData] = useState([]);
	const [activeTab, setActiveTab] = useState('news');

	function fetchData(viewType = 'news') {
		setActiveTab(viewType);
		getNewsData(viewType).then(data => {
			if (viewType === 'news') {
				setNewsData(data.news);
			} else if (viewType === 'subscription') {
				console.log('🚀 ~ getNewsData ~ data:', data);
				setNewsData(data.subscribe);
			}
		});
	}
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<StyledTab>
				<StyledTabItem
					onClick={() => fetchData('news')}
					$activeTab={activeTab === 'news'}
				>
					전체 언론사
				</StyledTabItem>
				<StyledTabItem
					onClick={() => fetchData('subscription')}
					$activeTab={activeTab === 'subscription'}
				>
					구독한 언론사
				</StyledTabItem>
			</StyledTab>
			<StyledWrapper>
				{newsData.length === 0 && (
					<StyledEmpty>아직 구독중인 언론사가 없어요 🧐</StyledEmpty>
				)}
				{chunkArray(newsData, 24).map((item, index) => (
					<StyledDiv key={index}>
						{item.map((data, idx) => (
							<StyledPressItem key={`${data.id}-${idx}`} pressData={data} />
						))}
					</StyledDiv>
				))}
			</StyledWrapper>
		</>
	);
}
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
	font-weight: ${props => (props.$activeTab ? 'bold' : 'normal')};
`;
const StyledWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 388px;
	overflow: hidden;
	margin: 0 auto;
`;
const StyledDiv = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	flex-shrink: 0;
	background-color: pink;
`;
const StyledPressItem = styled(PressItem)`
	border: 1px solid #d2dae0;
`;
const StyledEmpty = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	font-size: 30px;
	font-weight: bold;
`;
