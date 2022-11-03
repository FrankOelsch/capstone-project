import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <StyledH3>
          Bitte wählen sie das <br />
          gewünschte Torsystem:
        </StyledH3>
        <StyledLink to="/config">Sectionaltor</StyledLink>
        <StyledLink to="/config">Rundlauftor</StyledLink>
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

const StyledLink = styled(Link)`
  background-color: rgba(95, 158, 160, 0.85);
  box-shadow: 4px 8px 15px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  font-size: 2em;
  padding: 30px 40px;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
`;

const StyledH3 = styled.h3`
  background-color: rgba(95, 158, 160, 0.85);
  box-shadow: 4px 8px 15px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  font-size: 1em;
  padding: 30px 40px;
  color: #ffffff;
`;
