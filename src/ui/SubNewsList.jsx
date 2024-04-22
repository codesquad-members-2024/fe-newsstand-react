import styled from 'styled-components';

export function SubNewsList({ subNews, pressName }) {
	return (
		<StyledSubNewsList>
			{subNews.map(news => (
				<a href={news.href} target='_blank' key={news.length}>
					{news.title}
				</a>
			))}
			<b>{pressName} 언론사에서 직접 편집한 뉴스입니다.</b>
		</StyledSubNewsList>
	);
}

const StyledSubNewsList = styled.div`
	width: calc(100% - 352px);
	a {
		text-decoration: none;
		cursor: pointer;
		display: block;
		font-size: 16px;
		line-height: 22px;
		color: #4b5966;
		margin-bottom: 16px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		&:hover {
			text-decoration: underline;
		}
	}
	b {
		font-size: 14px;
		color: #879298;
		line-height: 17px;
	}
`;
