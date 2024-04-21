import { styled } from "styled-components";
import { useState, useEffect } from "react";

export function Subscription({ logoImage, handleSubscription }) {
  const [isSubscribed, setSubscribed] = useState(false);

  useEffect(() => {
    console.log("구독", isSubscribed, logoImage);
    if (isSubscribed) {
      handleSubscription(logoImage);
    }
  }, [isSubscribed]);

  const handleClick = () => {
    setSubscribed(!isSubscribed);
  };

  return (
    <StyledButton onClick={handleClick}>
      {isSubscribed ? "+ 해지하기" : "+ 구독하기"}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: none;
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
`;

export default Subscription;
