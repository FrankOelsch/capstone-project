import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function Layout() {
  return (
    <>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const Main = styled.main`
  margin: 100px auto;
`;
