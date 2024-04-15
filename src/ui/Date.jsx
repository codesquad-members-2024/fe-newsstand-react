import { styled } from 'styled-components';
import { getDate } from '../utility/utils';

export function Date() {
	return <StyledDate>{getDate()}</StyledDate>;
}

const StyledDate = styled.div`
	fons-size: 12px;
	clor: #333;
	font-weight: 500;
`;
