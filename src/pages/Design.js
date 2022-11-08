import { useContext } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserContext } from "../UserContext";

export default function Design() {
  const { config } = useContext(UserContext);

  return (
    <>
      <Header />
      <Container>
        <h1>Design-Page Is Under Construction</h1>
        <h1>{config.system}</h1>
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
`;
