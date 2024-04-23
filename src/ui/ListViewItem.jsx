import React from 'react';
import styled from 'styled-components';
import { MainNewsList } from './MainNewsList';
import { SubNewsList } from './SubNewsList';
import { ButtonSubscribe } from './ButtonSubscribe';

export function ListViewItem({ categorizedData }) {
	return (
		<>
			{categorizedData.map(news => (
				<StyledWrapper className='AAAAA' key={news.id}>
					<StyledContainer>
						<h2>{news.category}</h2>
						<StyledPressInfo key={news.id}>
							<StyledLogo src={news.logoImageSrc} alt={news.pressName} />
							<span>{news.editedTime}</span>
							<ButtonSubscribe isSubscribed={news.isSubscribed} />
						</StyledPressInfo>
						<StyledFlexBox key={news.pressName}>
							<MainNewsList mainNews={news.headline} />
							<SubNewsList subNews={news.sideNews} pressName={news.pressName} />
						</StyledFlexBox>
					</StyledContainer>
				</StyledWrapper>
			))}
		</>
	);
}
const StyledWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex: 0 0 100%;
`;
const StyledContainer = styled.div`
	border: 1px solid #d2dae0;
	padding: 24px;
	width: 100%;
	flex: 0 0 100%;
	height: 100%;
`;
const StyledPressInfo = styled.div`
	display: flex;
	align-items: center;
	height: 24px;
	margin-bottom: 16px;
	span {
		font-size: 12px;
		color: #5f6e76;
		margin: 0 16px;
	}
`;
const StyledLogo = styled.img`
	width: auto;
	height: 100%;
`;
const StyledFlexBox = styled.div`
	display: flex;
`;
