import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <StyledDiv to="/">
          <StyledH3>
            Bitte wählen sie das <br />
            gewünschte Torsystem:
          </StyledH3>
        </StyledDiv>
        <StyledDiv>
          <StyledLink to="/config">Sectionaltor</StyledLink>
        </StyledDiv>
        <StyledDiv>
          <StyledLink to="/config">Rundlauftor</StyledLink>
        </StyledDiv>
      </Container>
      <Footer />
    </>
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
  gap: 60px;
  background-image: url("background.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(95, 158, 160, 0.85);
  box-shadow: 4px 8px 15px rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 8px;
  width: 60%;
  min-width: 240px;
  height: 120px;
`;

const StyledLink = styled(Link)`
  font-size: 2em;
  padding: 40px;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
`;

const StyledH3 = styled.h3`
  font-size: 1em;
  color: #ffffff;
`;
