import { styled } from "styled-components";

export function NewsFlash() {
  return (
    <StyledDiv>
      <div className="newsFlash-content">
        <StyledContent>
          <b>연합뉴스</b>
          <span>'尹·李 회담' 급물살…오늘 3차 실무회동서 날짜 정할듯</span>
        </StyledContent>
        <StyledContent>
          <b>연합뉴스</b>
          <span>
            의대생들 "증원은 계약위반"…대학측 "민사 아닌 행정소송 대상"
          </span>
        </StyledContent>
      </div>
    </StyledDiv>
  );
}
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .newsFlash-content {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  width: 49%;
  height: 80px;
  background-color: #ececec;
  
  b {
    padding: 10px;
  }
  
  span {
    font-size: 16px;
    margin-left: 10px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 말줄임*/
  }
`;
