import styled from 'styled-components';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { PressItem } from './PressItem';
import { chunkArray } from '../utility/utils';
import { TableLine } from './TableLine';
export function GridView({
	newsData,
	fetchSubscriptionData,
	handleUnsubscribe,
}) {
	if (!newsData) return <div> ~ 로 딩 중 ~</div>;
	return (
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
	);
}
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
`;
const StyledButtonPrev = styled(StyledButton)`
	left: -50px;
`;
const StyledButtonNext = styled(StyledButton)`
	right: -50px;
`;
