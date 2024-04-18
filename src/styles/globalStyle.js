import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.5;
    background: white;
    color: black;
  }
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    text-align: center;
    font-size:16px;
    color: #5f6e76;
  }
`;
