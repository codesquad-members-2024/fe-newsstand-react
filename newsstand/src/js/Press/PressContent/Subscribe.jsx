import { styled } from "styled-components";
import { useState, useEffect } from "react";

export function Subscription({ viewType, logo }) {
  const [isSubscribed, setSubscribed] = useState(false);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    if (isSubscribed) {
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: logo.id }),
      };

      fetch("http://localhost:3000/api/users/channels", request)
        .then((response) => response.json())
        .then((data) => setPostId(data.id));

      logo.userSubscribed = true;
    }
  }, [isSubscribed]);

  const handleClick = () => {
    if (!logo.userSubscribed) {
      alert("내가 구독한 언론사에 추가되었습니다.");
    } else {
      alert("구독 해지 되었습니다.");
      const request = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: logo.id }),
      };

      fetch("http://localhost:3000/api/users/channels", request)
        .then((response) => response.json())
        .then((data) => setPostId(data.id)); 

      logo.userSubscribed = false;
    }
    setSubscribed(!logo.userSubscribed);
  };

  return (
    <StyledButton
      onClick={handleClick}
      hidden={viewType === "grid"}
      style={{ position: viewType === "grid" ? "absolute" : "static" }}
    >
      {logo.userSubscribed ? "- 해지하기" : "+ 구독하기"}
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
