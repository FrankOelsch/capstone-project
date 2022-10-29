import styled from "styled-components";
import Config from "./pages/Config";

function App() {
  return (
    <Container>
      <Config></Config>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 90%;
`;

export default App;
