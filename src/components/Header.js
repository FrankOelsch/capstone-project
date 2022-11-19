import styled from "styled-components";
import * as variables from "../Variables";

export default function Header({ text, size }) {
  return (
    <StyledHeader>
      <StyledH1 style={{ fontSize: size }}>{text}</StyledH1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: ${variables.BACKGROUND_COLOR_3};
  color: white;
  z-index: 2;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledH1 = styled.h1`
  font-family: "Abel", sans-serif;
`;
