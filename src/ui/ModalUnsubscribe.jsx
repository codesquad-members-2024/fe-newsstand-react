import styled from 'styled-components';
import { deleteNewsData } from '../apis/newsApiHandler';
export function ModalUnsubscribe({ selectedPress, setPopup, fetchData }) {
	return (
		<StyledModal>
			<StyledWrapper>
				<StyledTitle>
					<strong>{selectedPress.pressName}</strong>을(를)
					<br />
					구독해지하시겠습니까?
				</StyledTitle>
				<StyledButtonWrapper>
					<ButtonConfirm
						onClick={() => {
							deleteNewsData(selectedPress) //
								.then(() => {
									setPopup(false);
									fetchData();
								});
						}}
					>
						예, 해지합니다
					</ButtonConfirm>
					<ButtonClose
						onClick={() => {
							setPopup(false);
						}}
					>
						아니오
					</ButtonClose>
				</StyledButtonWrapper>
			</StyledWrapper>
		</StyledModal>
	);
}

const StyledModal = styled.div`
	z-index: 5;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
`;
const StyledWrapper = styled.div`
	z-index: 10;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 320px;
	background-color: #fff;
	border: 1px solid #d2dae0;
`;
const StyledTitle = styled.p`
	padding: 24px;
	font-size: 16px;
	line-height: 22px;
	text-align: center;
`;
const StyledButtonWrapper = styled.div`
	display: flex;
	background-color: #f5f7f9;
	border-top: 1px solid #d2dae0;
	button {
		width: 50%;
		padding: 13px 0;
		&:hover {
			font-weight: bold;
		}
	}
`;
const ButtonConfirm = styled.button`
	border-right: 1px solid #d2dae0;
`;
const ButtonClose = styled.button`
	color: #14212b;
`;
