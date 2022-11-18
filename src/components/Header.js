import styled from "styled-components";

export default function Header({ text }) {
  return (
    <StyledHeader>
      <StyledH1>{text}</StyledH1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  padding: 6px;
  background-color: hsl(216, 65%, 50%);
  color: white;
  z-index: 2;
`;

const StyledH1 = styled.h1`
  font-family: "Abel", sans-serif;
  font-size: 28px;
  text-align: center;
`;
