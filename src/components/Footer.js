import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CartIcon, Config2Icon, ConfigIcon, HomeIcon } from "../Icons";
import * as variables from "../Variables";

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
  background-color: ${variables.BACKGROUND_COLOR_3};
  color: ${variables.BACKGROUND_COLOR_8};
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
  color: ${variables.BACKGROUND_COLOR_8};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 25%;
  background-color: ${variables.BACKGROUND_COLOR_4};
  text-decoration: none;
  border: black solid 1px;
  transition: 0.5s;

  &.active {
    background-color: ${variables.BACKGROUND_COLOR_3};
  }

  &:hover {
    background-color: ${variables.BACKGROUND_COLOR_3};
  }
`;
