import { styled } from "styled-components";
import { Date } from "./Date";
import { reloadPage } from "../utils/utils";

export function Header() {
  return (
    <StyledHeader>
      <div className="title">
        <button className="refresh-btn" onClick={reloadPage}>
          <img src="./public/img/refresh.png" />
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
`;
