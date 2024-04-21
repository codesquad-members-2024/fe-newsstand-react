import { FolderTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { styled } from 'styled-components';
import { refreshPage, getTodayDate } from '../utility/utils';

export function Header() {
	return (
		<StyledHeader>
			<StyledWrapper>
				<StyledFlex>
					<StyledButton
						onClick={refreshPage}
						type='link'
						shape='default'
						icon={<FolderTwoTone />}
					/>
					<StyledTitle>뉴스 스탠드</StyledTitle>
				</StyledFlex>
				<StyledDate>{getTodayDate()}</StyledDate>
			</StyledWrapper>
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	margin: 58px 0 40px;
`;
const StyledWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const StyledFlex = styled.div`
	display: flex;
	align-items: center;
`;
const StyledButton = styled(Button)`
	font-size: 24px;
	margin-right: 8px;
`;
const StyledTitle = styled.h1`
	font-size: 24px;
	color: #14212b;
	font-weight: 700;
`;
const StyledDate = styled.p`
	font-size: 16px;
	color: #5f6e76;
	font-weight: 500;
`;
