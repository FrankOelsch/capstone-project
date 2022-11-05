import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledNav>
        <StyledNavLink to="/" end>
          home
        </StyledNavLink>
        <StyledNavLink to="/config">bookmark</StyledNavLink>
        <StyledNavLink to="/config2">add_box</StyledNavLink>
        <StyledNavLink to="/cart">Cart</StyledNavLink>
      </StyledNav>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: hsl(216, 65%, 50%);
  color: white;
  z-index: 2;
`;

const StyledH1 = styled.h1`
  font-family: "Abel", sans-serif;
  font-size: 32px;
  text-align: center;
`;

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledNavLink = styled(NavLink)`
  height: 60px;
  width: 25%;
  text-align: center;
  background-color: azure;
  padding-top: 8px;
  text-decoration: none;
  border: black solid 1px;
  transition: 0.5s;

  font-family: "Material Symbols Outlined";
  font-size: 48px;
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  color: darkolivegreen;

  &.active {
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
    background-color: cadetblue;
    color: white;
  }

  &:hover {
    background-color: cadetblue;
    color: white;
  }
`;
