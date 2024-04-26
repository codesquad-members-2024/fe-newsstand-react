import styled from "styled-components";
import { useState, useEffect } from "react";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import { PressContent } from "./PressContent/PressContent";
import { fetchData } from "../../utils/utils";

export function Press() {
  const [media, setMedia] = useState("allMedia"); /** all, subscribed */
  const [viewType, setViewType] = useState("grid"); /** grid, list */
  const [news, setNews] = useState([]); /** news data */
  const [subNews, setSubNews] = useState([]); /** subscribed news data */

  useEffect(() => {
    fetchData("http://localhost:3000/api/channels", setNews);
  }, []);

  return (
    <PressWrap>
      <PressHeader
        media={media}
        setMedia={setMedia}
        viewType={viewType}
        setViewType={setViewType}
        setNews={setNews}
        setSubNews={setSubNews}
      />
      <PressContent
        media={media}
        viewType={viewType}
        news={news}
        subNews={subNews}
      />
    </PressWrap>
  );
}

function PressHeader({ media, setMedia, viewType, setViewType, setSubNews }) {
  const gridView = () => setViewType("grid");
  const listView = () => setViewType("list");
  const allMedia = () => setMedia("allMedia");
  const subscribedMedia = async () => {
    setMedia("subscribedMedia");

    const response = await fetch("http://localhost:3000/api/users/channels");
    const data = await response.json();
    setSubNews(data);

    if (data.length === 0) {
      allMedia();
      alert("구독한 언론사가 없습니다.");
    }
  };

  return (
    <Header>
      <div className="press-title">
        <span
          onClick={allMedia}
          style={{ fontWeight: media === "allMedia" ? "bold" : "normal" }}
        >
          전체 언론사
        </span>
        <span
          onClick={subscribedMedia}
          style={{
            fontWeight: media === "subscribedMedia" ? "bold" : "normal",
          }}
        >
          내가 구독한 언론사
        </span>
      </div>
      <StyledDiv>
        <StyledButton className="list-view-btn" onClick={listView}>
          <BarsOutlined
            style={{ color: viewType === "list" ? "blue" : "gray" }}
          />
        </StyledButton>
        <StyledButton className="grid-view-btn" onClick={gridView}>
          <AppstoreOutlined
            style={{ color: viewType === "grid" ? "blue" : "gray" }}
          />
        </StyledButton>
      </StyledDiv>
    </Header>
  );
}

const PressWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
  height: 30px;

  .press-title span {
    margin-right: 20px;
    font-size: 20px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  font-size: 25px;
`;
