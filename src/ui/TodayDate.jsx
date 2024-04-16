import { styled } from 'styled-components';
import { getTodayDate } from '../utility/utils';

export function TodayDate() {
	return <StyledDate>{getTodayDate()}</StyledDate>;
}

const StyledDate = styled.div`
	font-size: 12px;
	color: #333;
	font-weight: 500;
`;
