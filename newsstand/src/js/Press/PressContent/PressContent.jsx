import styled from "styled-components";
import { useState } from "react";
import { shuffle } from "../../../utils/utils";
import { news } from "../../../data/news.json";
import { Subscription } from "./Subscribe";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const PAGE_SIZE = 24;
const LAST_PAGE = 3;

function getLogoImage(news) {
  return news.map((item) => item.logoImageSrc);
}

const shuffleLogos = shuffle(getLogoImage(news));

/** 전체 언론사*/
function createGrid(index) { 
  const [subscribedLogos, setSubscribedLogos] = useState([]);

  const handleSubscription = (logoImage) => {
    setSubscribedLogos(prevLogos => [...prevLogos, logoImage]);
  };

  if (index < shuffleLogos.length) {
    return (
      <StyledLogo className="press-logo" key={index}>
        <img src={shuffleLogos[index]} alt={`Logo ${index}`} />
        <Subscription
          logoImage={shuffleLogos[index]}
          handleSubscription={handleSubscription}
        />
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

function Grid({ currentPage }) {
  return <StyledGrid>{renderGrid(currentPage)}</StyledGrid>;
}

/** 내가 구독한 언론사 */
function createSubGrid(subscribedLogos, index) { 
  if (index < subscribedLogos.length) {
    return (
      <StyledLogo className="press-logo" key={index}>
        <img src={subscribedLogos[index]} alt={`Logo ${index}`} />
        <Subscription logoImage={subscribedLogos[index]} />
      </StyledLogo>
    );
  }
}

function renderSubGrid(page) {
  const gridElements = [];
  for (let index = 0; index < PAGE_SIZE; index++) {
    gridElements.push(createSubGrid(page * PAGE_SIZE + index));
  }
  return gridElements;
}

function SubGrid({ currentPage }) {
  return <StyledGrid>{renderSubGrid(currentPage)}</StyledGrid>;
}


function Swiper({ currentPage, setCurrentPage }) {
  const goToPreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1);

  return (
    <>
      <StyledButton className="left-btn" onClick={goToPreviousPage} hidden={currentPage === 0}>
        <LeftOutlined />
      </StyledButton>
      <StyledButton className="right-btn" onClick={goToNextPage} hidden={currentPage === LAST_PAGE}>
        <RightOutlined />
      </StyledButton>
    </>
  );
}

export function PressContent({ grid, setGrid }) {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <Content>
      {grid ? (<Grid currentPage={currentPage} />) : (<SubGrid currentPage={currentPage} />)}
      <Swiper currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Content>
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

const Content = styled.div`
  position: relative;
`;

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
