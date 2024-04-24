import { styled } from "styled-components";
import { useState, useEffect } from "react";

export function Subscription({ logoImage, setSubscribedLogos, viewType }) {
  const [isSubscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (isSubscribed) {
      console.log("구독", isSubscribed, logoImage);
      setSubscribedLogos((prevLogos) => [...prevLogos, logoImage]);
    }
  }, [isSubscribed]);

  const handleClick = () => {
    if(!isSubscribed) alert("구독한 언론사에 추가되었습니다.");
    setSubscribed(!isSubscribed);
  }

  return (
    <StyledButton
      onClick={handleClick}
      hidden={viewType === "grid"}
      style={{ position: viewType === "grid" ? "absolute" : "static" }}
    >
      {isSubscribed ? "+ 해지하기" : "+ 구독하기"}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  top: 35%;
  left: 20%;
  font-size: 16px;
  color: #808080;
  background: white;
  border: 1px solid #d3d9df;
  border-radius: 20px;
  display: ${(props) => (props.hidden ? "none" : "block")};
`;

export default Subscription;
