import styled from "styled-components";
import { useState } from "react";
import { PressContent } from "./PressContent/PressContent";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";

function PressHeader({ setGrid }) {
  const [select, setSelect] = useState('all'); 
  const [view, setView] = useState('grid');

  const allMedia = () => {
    setGrid(true);
    setSelect('all');
  };

  const subscribedMedia = () => {
    setGrid(false);
    setSelect('subscribed'); 
  };

  const gridView = () => {
    setView('grid');
  };

  const listView = () => {
    setView('list'); // setList 만들예정
  };

  return (
    <Header>
      <div className="press-title">
        <span onClick={allMedia} style={{ fontWeight: select === 'all' ? 'bold' : 'normal' }}>전체 언론사</span>
        <span onClick={subscribedMedia} style={{ fontWeight: select === 'subscribed' ? 'bold' : 'normal' }}>내가 구독한 언론사</span>
      </div>
      <div className="view-btn">
      <StyledButton className="list-view-btn" onClick={listView}>
        <BarsOutlined style={{ color: view === 'list' ? 'blue' : 'gray' }} />
      </StyledButton>
      <StyledButton className="grid-view-btn" onClick={gridView}>
        <AppstoreOutlined style={{ color: view === 'grid' ? 'blue' : 'gray' }} />
      </StyledButton>
    </div>
    </Header>
  );
}

export function Press() {
  const [grid, setGrid] = useState(true);
  return (
    <PressWrap>
      <PressHeader setGrid={setGrid} />
      <PressContent grid={grid} setGrid={setGrid} />
    </PressWrap>
  );
}

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

  .view-btn {
    display: flex;
  }
`;

const PressWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  font-size: 25px;
`;