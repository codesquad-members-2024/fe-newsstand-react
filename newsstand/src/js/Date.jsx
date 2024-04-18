import { styled } from "styled-components";
import { getCurrentDate } from "../utils/utils.js";

export function Date() {
  return <StyledSpan>{getCurrentDate()}</StyledSpan>;
}

const StyledSpan = styled.span`
  font-size: 20px;
`;
