import { styled } from "styled-components";

export function NewsFlash() {
  return (
    <StyledDiv>
      <div className="newsFlash-content">
        <div className="content-left"></div>
        <div className="content-right"></div>
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

  .content-left,
  .content-right {
    width: 49%;
    height: 80px;
    background-color: #ececec;
  }
`;
