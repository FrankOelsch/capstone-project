import { createGlobalStyle } from "styled-components";
import NotoSans from "./fonts/noto-sans-v27-latin-regular.woff";
import NotoSans2 from "./fonts/noto-sans-v27-latin-regular.woff2";
import Abel from "./fonts/abel-v18-latin-regular.woff";
import Abel2 from "./fonts/abel-v18-latin-regular.woff2";
import * as variables from "./Variables";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Abel';
    src: url(${Abel2}) format('woff2'),
    url(${Abel}) format('woff');
  }

  @font-face {
    font-family: 'Noto Sans';
    src: url(${NotoSans2}) format('woff2'),
    url(${NotoSans}) format('woff');
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    position: relative;
    height: 100%;
    background-color: ${variables.BACKGROUND_COLOR_5};
    font-family: 'Noto Sans', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  main {
    position: relative;
    height: 100%;
    min-height: 100vh;
    padding: 50px 0;
  }

  main::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(background3.png);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    filter: opacity(45%) blur(3px);
  }

`;

export default GlobalStyle;
