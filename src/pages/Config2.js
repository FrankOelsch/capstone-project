import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Config2() {
  return (
    <>
      <Header />
      <Container>
        <h1>Config2 Is Under Construction</h1>
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
`;
