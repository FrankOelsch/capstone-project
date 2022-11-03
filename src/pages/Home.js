import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      <StyledH2>Bitte wählen sie das <br/>gewünschte Torsystem:</StyledH2>
      <StyledLink to="/config">Sectionaltor</StyledLink>
      <StyledLink to="/config">Rundlauftor</StyledLink>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: url("background.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledLink = styled(Link)`
  font-size: 2em;
  background-color: rgba(95, 158, 160, 0.85);
  box-shadow: 4px 8px 15px rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 8px;
  color: #ffffff;
  padding: 46px 0;
  width: 60%;
  height: 140px;
  margin: 40px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

const StyledH2 = styled.h2`
  position: absolute;
  top: 40px;
`;
