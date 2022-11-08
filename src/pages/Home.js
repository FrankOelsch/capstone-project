import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({
  config,
  setConfig,
  configForSave,
  setConfigForSave,
}) {
  function handleClickSectional() {
    setConfig({ ...config, system: "Sectionaltor" });
    // setConfigForSave({ ...configForSave, system: "Sectionaltor" });
  }

  function handleClickRundlauf() {
    setConfig({ ...config, system: "Rundlauftor" });
    // setConfigForSave({ ...configForSave, system: "Rundlauftor" });
  }

  return (
    <>
      <Header />
      <Container>
        <section>Bitte wählen sie das gewünschte Torsystem:</section>
        <StyledLink to="/measure" onClick={handleClickSectional}>
          <h2>Sectionaltor</h2>
          <p>
            Öffnet nach oben
            <br />
            Breite bis 500 cm möglich
            <br />
            Höhe abhängig von Breite
            <br />
            Keine Bodenschiene
            <br />
            Seitliche Innenwände frei
          </p>
        </StyledLink>
        <StyledLink to="/measure" onClick={handleClickRundlauf}>
          <h2>Rundlauftor</h2>
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
        </StyledLink>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 30px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  section {
    background-color: rgba(95, 158, 160, 0.75);
    box-shadow: 4px 8px 15px rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    font-size: 1em;
    width: 280px;
    padding: 10px;
    color: hsl(216, 65%, 0%);
  }
`;

const StyledLink = styled(Link)`
  color: hsl(216, 65%, 0%);
  background-color: rgba(95, 158, 160, 0.75);
  box-shadow: 4px 8px 15px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  width: 280px;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;

  p {
    font-family: "Noto Sans", Arial, Helvetica, sans-serif;
    font-size: 1.1em;
    color: hsl(216, 65%, 0%);
  }

  h2 {
    font-family: "Noto Sans", Arial, Helvetica, sans-serif;
    font-size: 1.6em;
    color: hsl(216, 65%, 0%);
  }
`;
