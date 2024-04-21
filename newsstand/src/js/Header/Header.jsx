import { styled } from "styled-components";
import { Date } from "./Date";
import { reloadPage } from "../../utils/utils";
import { PicLeftOutlined } from "@ant-design/icons";

export function Header() {
  return (
    <StyledHeader>
      <div className="title">
        <button className="refresh-btn" onClick={reloadPage}>
        <PicLeftOutlined />        
        </button>
        <h1>뉴스스탠드</h1>
      </div>
      <Date />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;

  .title {
    display: flex;
  }
  .refresh-btn {
    font-size: 30px;
    color: blue;
  }
`;
