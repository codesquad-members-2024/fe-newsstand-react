import styled from "styled-components";
import { useEffect, useState } from "react";
import { Grid } from "./Grid";
import { List } from "./List";
import { Swiper } from "./Swiper";

export function PressContent({ media, viewType }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [news, setNews] = useState([]);
  const [subNews, setSubNews] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/channels");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSubData() {
      try {
        const response = await fetch("http://localhost:3000/api/users/channels");
        const data = await response.json();
        setSubNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchSubData();
  }, []);

  return (
    <Content>
      {viewType === "grid" ? (
      <Grid news={news} subNews={subNews} currentPage={currentPage} media={media} viewType={viewType} />) 
        : (<List news={news} subNews={subNews} currentPage={currentPage} setCurrentPage={setCurrentPage} media={media} viewType={viewType} />
        )}
      <Swiper news={news} currentPage={currentPage} setCurrentPage={setCurrentPage} viewType={viewType}/>
    </Content>
  );
}

const Content = styled.div`
  position: relative;
`;
