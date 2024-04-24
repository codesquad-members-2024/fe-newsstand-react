import styled from 'styled-components';
import { useState } from 'react';
import { PressItem } from './PressItem';
import { chunkArray } from '../utility/utils';
import { TableLine } from './TableLine';
import { Slider } from './Slider';
export function GridView({
	newsData,
	fetchSubscriptionData,
	setPopup,
	setSelectedPress,
}) {
	const [sliderPosition, setSliderPosition] = useState(0);
	const totalSlides = chunkArray(newsData, 24).length;
	return (
		<>
			{!newsData && <div>~ l o a d i n g ~</div>}
			<StyledSwiperWrapper>
				<StyledSwiperContainer>
					<StyleTableLine />
					{newsData.length === 0 && (
						<StyledEmpty>아직 구독중인 언론사가 없어요 🧐</StyledEmpty>
					)}
					<Slider
						totalSlides={totalSlides}
						sliderPosition={sliderPosition}
						setSliderPosition={setSliderPosition}
					>
						{chunkArray(newsData, 24).map((item, index) => (
							<StyledDiv key={index}>
								{item.map((data, idx) => (
									<StyledPressItem
										key={`${data.id}-${idx}`}
										pressData={data}
										fetchSubscriptionData={fetchSubscriptionData}
										setPopup={setPopup}
										setSelectedPress={setSelectedPress}
									/>
								))}
							</StyledDiv>
						))}
					</Slider>
				</StyledSwiperContainer>
			</StyledSwiperWrapper>
		</>
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
	// overflow: hidden;
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
