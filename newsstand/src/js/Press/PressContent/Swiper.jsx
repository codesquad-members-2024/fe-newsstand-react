import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const GRID_LAST_PAGE = 3;

export function Swiper({ currentPage, setCurrentPage, viewType, news }) {
  const LIST_LAST_PAGE = news.length - 1;

  const goToPreviousPage = () => setCurrentPage(currentPage === 0 ? LIST_LAST_PAGE : currentPage - 1);
  const goToNextPage = () => setCurrentPage(currentPage === LIST_LAST_PAGE ? 0 : currentPage + 1);
  
  return (
    <>
      <StyledButton className="left-btn" onClick={goToPreviousPage} hidden={viewType === 'grid' && currentPage === 0}>
        <LeftOutlined />
      </StyledButton>
      <StyledButton className="right-btn" onClick={goToNextPage} hidden={viewType === 'grid' && currentPage === GRID_LAST_PAGE}>
        <RightOutlined />
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  position: absolute;
  top: 40%;
  font-size: 50px;
  width: 50px;
  z-index: 1;
  color: #909090;
  
  &.right-btn {
    right: -10%;
  }

  &.left-btn {
    left: -10%;
  }
`;
