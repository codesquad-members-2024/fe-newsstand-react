import styled from "styled-components";
import { useState } from "react";
import { Subscription } from "./Subscribe";

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
        <CategoryBtn key={index} onClick={() => handleCategoryClick(category)} active={category === activeCategory}>
          {category}
        </CategoryBtn>
      ))}
    </StyledCategory>
  );
}


function createList(currentPage, media, viewType, news, subNews) {
  // subNews 추가 예정 media all인지 sub인지
  const item = news[currentPage];
  const { logoImageSrc, editedTime, headline, sideNews } = item;
  const sideNewsList = sideNews.map((newsItem) => (
    <p key={newsItem.title}>{newsItem.title}</p>
  ));

  const [subscribedLogos, setSubscribedLogos] = useState([]);

  const handleSubscription = (logoImage) => {
    setSubscribedLogos((prevLogos) => [...prevLogos, logoImage]);
  };

  return (
    <>
      <Top>
        <img src={logoImageSrc} />
        <span>{editedTime}</span>
        <Subscription
          viewType={viewType}
          logoImage={logoImageSrc}
          handleSubscription={handleSubscription}
        />
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

function renderList(currentPage, media, viewType, news, subNews) {
  return <>{createList(currentPage, media, viewType, news, subNews)}</>;
}

export function List({ currentPage, setCurrentPage, media, viewType, news, subNews }) {
  return (
    <StyledList>
      <Category setCurrentPage={setCurrentPage} news={news} />
      {renderList(currentPage, media, viewType, news, subNews)}
    </StyledList>
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
  ${(props) => props.active && `
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
  }
  span {
    margin: 20px;
  }
`;

const Right = styled.div`
  width: 650px;
  margin-left: 2rem;
  p:hover {
    text-decoration: underline;
  }
`;
