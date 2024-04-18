import styled from "styled-components";
import { useState } from "react";
import PropTypes from 'prop-types';
import { shuffle } from "../utils/utils";
import { news } from "../data/news.json"
import { Subscription } from "./Subscribe";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const PAGE_SIZE = 24;
const ALL_LOGS = 96;

function getLogoImage(news) {
  let newsLogos = [];
  for (let i = 0; i < ALL_LOGS; i++) {
    let logoSrc = news[i].logoImageSrc;
    newsLogos.push(logoSrc)
  }
  return newsLogos;
}

const shuffleLogos = shuffle(getLogoImage(news));

function createGrid(index) {
  if (index < shuffleLogos.length) {
    return (
      <StyledLogo className="press-logo" key={index}>
        <img src={shuffleLogos[index]} alt={`Logo ${index}`} />
        <Subscription />
      </StyledLogo>
    );
  }
}

function renderGrid(page) {
  const gridElements = [];
  for (let index = 0; index < PAGE_SIZE; index++) {
    gridElements.push(createGrid(page * PAGE_SIZE + index));
  }
  return gridElements;
}

export function ChangePage({ currentPage, setCurrentPage }) {
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Contents>
      <StyledGrid className="press">{renderGrid(currentPage)}</StyledGrid>
      <StyledButton className="left-btn" onClick={goToPreviousPage} hidden={currentPage === 0}>
        <LeftOutlined />
      </StyledButton>
      <StyledButton className="right-btn" onClick={goToNextPage} hidden={currentPage === 3}>
        <RightOutlined /> 
      </StyledButton>
    </Contents>
  );
}

ChangePage.propTypes = { //is missing in props validation 에러. 타입 정의. ts쓰면 필요 업음
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

export function PressWithPagination() {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div>
      <ChangePage currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

const StyledGrid = styled.div`
  border-top: 2px solid #d5d5d5;
  border-left: 2px solid #d5d5d5;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, auto);
  height: 400px;
  position: relative;
`;

const StyledLogo = styled.div`
  border-right: 2px solid #d5d5d5;
  border-bottom: 2px solid #d5d5d5;
  padding: 10px;
  font-size: 30px;
  text-align: center;
  background: white;
  position: relative;
  &:hover {
    background: #f6f7f9;
    > button {
      display: block;
    }
    img {
      visibility: hidden;
    }
  }
  img {
    visibility: visible;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 2rem;
  }
`;

const Contents = styled.div`
position: relative;
`

const StyledButton = styled.button`
  position: absolute;
  top: 40%;
  font-size: 50px;
  width: 50px;
  z-index: 1;
  color: #909090;
  &.right-btn {
    right: -10%
  }
  &.left-btn {
    left: -10%
  }
`;
