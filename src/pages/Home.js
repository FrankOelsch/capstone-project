import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import * as variables from "../Variables";

export default function Home() {
  const { config, setConfig } = useContext(UserContext);

  function handleClickSectional() {
    setConfig({ ...config, system: "Sectionaltor" });
  }

  function handleClickRundlauf() {
    setConfig({ ...config, system: "Rundlauftor" });
  }

  return (
    <>
      <Header text={"MyGarageDoor"} />
      <Container>
        <Wrapper>
          <StyledH2>
            Mit dieser App können sie ganz einfach ihre <br />
            Garage vorplanen + Kosten einschätzen
          </StyledH2>
          <StyledArticle>
            <h3>Sectionaltor</h3>
            <p>
              Öffnet nach oben
              <br />
              Breite bis 500 cm möglich
              <br />
              Höhe bis 250 möglich
              <br />
              Keine Bodenschiene
              <br />
              Seitliche Innenwände frei
            </p>
          </StyledArticle>
          <StyledLink to="/measure" onClick={handleClickSectional}>
            Beginnen mit Sectionaltor
          </StyledLink>
          <StyledArticle>
            <h3>Rundlauftor</h3>
            <p>
              Öffnet seitlich
              <br />
              Breite bis 600 cm möglich
              <br />
              Höhe bis 300 cm möglich
              <br />
              Keine Federn oder Seilzüge
              <br />
              Deckenbereich frei
            </p>
          </StyledArticle>
          <StyledLink to="/measure" onClick={handleClickRundlauf}>
            Beginnen mit Rundlauftor
          </StyledLink>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.main`
  position: relative;
  height: 100%;
  min-height: 100vh;
  padding: 50px 0;

  &::before {
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

    filter: blur(3px);
    /* filter: contrast(70%); */
    /* filter: opacity(80%); */

    /* filter: grayscale(50%); */
    /* filter: sepia(100%); */
    /* filter: brightness(80%); */
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledArticle = styled.article`
  color: ${variables.BACKGROUND_COLOR_13};
  border: 3px solid;
  background-color: ${variables.BACKGROUND_COLOR_2};
  border-color: ${variables.BACKGROUND_COLOR_1};
  border-radius: 8px;
  width: 280px;
  padding: 8px;
  margin-top: 12px;

  p {
    font-family: "Noto Sans", Arial, Helvetica, sans-serif;
    font-size: 1em;
    color: ${variables.BACKGROUND_COLOR_13};
  }

  h3 {
    font-family: "Noto Sans", Arial, Helvetica, sans-serif;
    font-size: 1.4em;
    color: ${variables.BACKGROUND_COLOR_13};
  }
`;

const StyledLink = styled(Link)`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  color: ${variables.BACKGROUND_COLOR_8};
  width: 280px;
  padding: 10px;
  border: 3px solid;
  border-color: ${variables.BACKGROUND_COLOR_1};
  border-radius: 6px;
  outline: none;
  background-color: ${variables.BACKGROUND_COLOR_1};
  text-decoration: none;
  margin-top: 12px;

  &:hover {
    border-color: hsl(216, 65%, 50%);
  }
`;

const StyledH2 = styled.h2`
  font-family: "Noto Sans", Arial, Helvetica, sans-serif;
  font-size: 1.05em;
  margin-top: 16px;
  padding: 0;
  color: ${variables.BACKGROUND_COLOR_9};
`;
