import { styled } from 'styled-components';
import { Header } from './ui/Header';
import { PressListContainer } from './ui/PressListContainer';

function App() {
	return (
		<StyeldWrapper>
			<StyledContainer>
				<Header />
				<PressListContainer />
			</StyledContainer>
		</StyeldWrapper>
	);
}
const StyeldWrapper = styled.div``;
const StyledContainer = styled.div`
	width: 930px;
	margin: 0 auto;
`;
export default App;
