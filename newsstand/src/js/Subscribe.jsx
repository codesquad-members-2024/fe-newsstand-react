import { styled } from "styled-components";
import { useState, useEffect } from "react";

export function Subscription() {
  const [isSubscribed, subscribed] = useState(false);

  useEffect(() => {
    console.log("구독", isSubscribed);
  }, [isSubscribed]);

  const handleSubscription = () => {
    subscribed(!isSubscribed);
  };

  return (
    <StyledButton onClick={handleSubscription}>
      {isSubscribed ? "+ 구독 취소" : "+ 구독 하기"}
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
