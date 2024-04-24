import styled from 'styled-components';

export function MainNewsList({ mainNews }) {
	return (
		<StyledMainNewsList href={mainNews.href} target='_blank'>
			<div>
				<img src={mainNews.thumbnailSrc} alt={mainNews.title} />
			</div>

			<p>{mainNews.title}</p>
		</StyledMainNewsList>
	);
}
const StyledMainNewsList = styled.a`
	cursor: pointer;
	width: 320px;
	margin-right: 32px;
	text-decoration: none;
	div {
		width: 100%;
		height: 200px;
		margin-bottom: 16px;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.5s;
		}
	}
	&:hover {
		img {
			transform: scale(1.1);
		}
		p {
			text-decoration: underline;
		}
	}
	p {
		font-size: 14px;
		line-height: 20px;
		color: #14212b;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-weight: 500;
	}
`;
