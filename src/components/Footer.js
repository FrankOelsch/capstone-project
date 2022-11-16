import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CartIcon, Config2Icon, ConfigIcon, HomeIcon } from "../Icons";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledNav>
        <StyledNavLink to="/" end>
          <HomeIcon />
          Start
        </StyledNavLink>
        <StyledNavLink to="/measure">
          <ConfigIcon />
          Masse
        </StyledNavLink>
        <StyledNavLink to="/design">
          <Config2Icon />
          Design
        </StyledNavLink>
        <StyledNavLink to="/cart">
          <CartIcon />
          WarenKorb
        </StyledNavLink>
      </StyledNav>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: hsl(216, 65%, 50%);
  color: white;
  z-index: 2;
`;

const StyledNav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledNavLink = styled(NavLink)`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8em;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 25%;
  background-color: hsl(216, 65%, 60%);
  text-decoration: none;
  border: black solid 1px;
  transition: 0.5s;

  &.active {
    background-color: hsl(216, 65%, 50%);
  }

  &:hover {
    background-color: hsl(216, 65%, 50%);
  }
`;
