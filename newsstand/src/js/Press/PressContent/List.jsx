import styled from "styled-components";
import { useState } from "react";
import { Subscription } from "./Subscribe";

export function List({ currentPage, setCurrentPage, media, viewType, news, subNews }) {
  return (
    <StyledList>
      {media === 'allMedia' ? <Category setCurrentPage={setCurrentPage} news={news} /> : <SubscribedCategory setCurrentPage={setCurrentPage} news={subNews} />}
      {renderList(currentPage, media, viewType, news, subNews)}
    </StyledList>
  );
}

function Category({ setCurrentPage, news }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const categories = Array.from(new Set(news.map((item) => item.category)));

  function getFirstCategoryIndex(category) {
    return news.findIndex((item) => item.category === category);
  }

  const handleCategoryClick = (category) => {
    const firstCategoryIndex = getFirstCategoryIndex(category);
    setCurrentPage(firstCategoryIndex);
    setActiveCategory(category);
  };

  return (
    <StyledCategory>
      {categories.map((category, index) => (
        <CategoryBtn
          key={index}
          onClick={() => handleCategoryClick(category)}
          $active={category === activeCategory ? "true" : "false"}
        >
          {category}
        </CategoryBtn>
      ))}
    </StyledCategory>
  );
}

function SubscribedCategory({ setCurrentPage, news }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const categories = Array.from(new Set(news.map((item) => item.pressName)));

  const handleCategoryClick = (pressName, index) => {
    setCurrentPage(index);
    setActiveCategory(pressName);
  };

  return (
    <StyledCategory>
      {categories.map((pressName, index) => (
        <CategoryBtn
          key={index}
          onClick={() => handleCategoryClick(pressName, index)}
          $active={pressName === activeCategory ? "true" : "false"}
        >
          {pressName}
        </CategoryBtn>
      ))}
    </StyledCategory>
  );
}

function renderList(currentPage, media, viewType, news, subNews) {
  return <>{createList(currentPage, media, viewType, news, subNews)}</>;
}

function createList(currentPage, media, viewType, news, subNews) {
  const item = media === "allMedia" ? news[currentPage] : (subNews.length !== 0 ? subNews[currentPage] : news[currentPage]);

  const { logoImageSrc, editedTime, headline, sideNews } = item;

  const sideNewsList = sideNews.map((newsItem) => (
    <p key={newsItem.title}>{newsItem.title}</p>
  ));

  return (
    <>
      <Top>
        <img src={logoImageSrc} />
        <span>{editedTime}</span>
        <Subscription viewType={viewType} logo={item} />
      </Top>
      <StyledDesc>
        <Left>
          <img src={headline.thumbnailSrc} />
          <span>{headline.title}</span>
        </Left>
        <Right>{sideNewsList}</Right>
      </StyledDesc>
    </>
  );
}

const StyledCategory = styled.div`
  background: #ececec;
`;

const CategoryBtn = styled.button`
  color: #5c5c5c;
  height: 50px;
  font-size: 20px;
  padding: 0px 15px;
  ${(props) => props.$active === "true" &&
    `
    color: white;
    background: #6f6fff;
    padding: 0px 100px;
  `}
`;

const StyledList = styled.div`
  border: 2px solid #d5d5d5;
  height: 400px;
  position: relative;
`;

const Top = styled.div`
  display: flex;
  margin: 15px;
  align-items: center;
  span {
    margin: 0px 2rem;
  }
`;

const StyledDesc = styled.div`
  display: flex;
`;

const Left = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
  align-items: center;
  img {
    height: 200px;
    width: 320px;
    margin: 0px 20px;
    &:hover {
      height: 210px;
      width: 330px;
    }
  }
  span {
    margin: 20px;
    font-size: 18px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Right = styled.div`
  width: 650px;
  margin-left: 2rem;
  font-size: 18px;
  p:hover {
    text-decoration: underline;
  }
`;
