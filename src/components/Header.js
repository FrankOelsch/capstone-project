import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>MyGarageDoor</StyledH1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: darkgoldenrod;
  color: white;
  z-index: 2;
`;

const StyledH1 = styled.h1`
  font-family: "Abel", sans-serif;
  font-size: 32px;
  text-align: center;
`;
