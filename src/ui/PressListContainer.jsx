import { styled } from 'styled-components';
import { PressItem } from './PressItem';
import { useEffect, useState } from 'react';
import { getNewsData } from '../apis/getNewsData';
import { chunkArray } from '../utility/utils';

export function PressListContainer() {
	const [newsData, setNewsData] = useState([]);
	useEffect(() => {
		getNewsData().then(data => {
			setNewsData(data.news);
		});
	}, []);
	return (
		<StyledWrapper>
			{chunkArray(newsData, 24).map((item, index) => (
				<StyledDiv key={index}>
					{item.map(i => (
						<StyledPressItem key={i.id} pressData={i} />
					))}
				</StyledDiv>
			))}
			{/* {newsData.map(newsDataItem => (
				<StyledPressItem key={newsDataItem.id} pressData={newsDataItem} />
			))} */}
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	display: flex;
	width: 930px;
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
