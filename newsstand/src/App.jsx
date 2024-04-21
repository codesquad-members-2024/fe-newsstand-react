import styled from "styled-components";
import { Header } from "./js/Header/Header";
import { NewsFlash } from "./js/NewsFlash/NewsFlash";
import { Press } from "./js/Press/PressHeader";

function App() {
  return (
    <Wrap>
      <Header />
      <NewsFlash />
      <Press />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
`;

export default App;
