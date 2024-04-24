import styled from "styled-components";
import { useState } from "react";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import { PressContent } from "./PressContent/PressContent";

export function Press({ news }) {
  // media & view 값 선언
  const [media, setMedia] = useState("allMedia"); /** all, subscribed */
  const [viewType, setViewType] = useState("grid"); /** grid, list */

  return (
    <PressWrap>
      <PressHeader media={media} setMedia={setMedia} viewType={viewType} setViewType={setViewType} />
      <PressContent media={media} viewType={viewType} news={news} />
    </PressWrap>
  );
}

function PressHeader({ media, setMedia, viewType, setViewType }) {
  const allMedia = () => {
    setMedia("allMedia");
  };

  const subscribedMedia = () => {
    setMedia("subscribedMedia");
  };

  const gridView = () => {
    setViewType("grid");
  };

  const listView = () => {
    setViewType("list"); // list 필요
  };

  return (
    <Header>
      <div className="press-title">
        <span onClick={allMedia} style={{ fontWeight: media === "allMedia" ? "bold" : "normal" }}>전체 언론사</span>
        <span onClick={subscribedMedia} style={{ fontWeight: media === "subscribedMedia" ? "bold" : "normal"}}>내가 구독한 언론사</span>
      </div>
      <StyledDiv>
        <StyledButton className="list-view-btn" onClick={listView}>
          <BarsOutlined style={{ color: viewType === "list" ? "blue" : "gray" }} />
        </StyledButton>
        <StyledButton className="grid-view-btn" onClick={gridView}>
          <AppstoreOutlined style={{ color: viewType === "grid" ? "blue" : "gray" }} />
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
