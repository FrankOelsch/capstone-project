import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledH1>MyGarageDoor</StyledH1>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: hsl(216, 65%, 50%);
  color: white;
  z-index: 2;
`;

const StyledH1 = styled.h1`
  font-family: "Abel", sans-serif;
  font-size: 32px;
  text-align: center;
`;
