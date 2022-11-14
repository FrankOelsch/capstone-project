import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CartIcon, Config2Icon, ConfigIcon, HomeIcon } from "../Icons";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledNav>
        <StyledNavLink to="/" end>
          <HomeIcon />
        </StyledNavLink>
        <StyledNavLink to="/measure">
          <ConfigIcon />
        </StyledNavLink>
        <StyledNavLink to="/design">
          <Config2Icon />
        </StyledNavLink>
        <StyledNavLink to="/cart">
          <CartIcon />
        </StyledNavLink>
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

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledNavLink = styled(NavLink)`
  height: 60px;
  padding: 13px;
  width: 25%;
  text-align: center;
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
