import styled from "styled-components";
import * as variables from "../Variables";

export default function Button({ children, type = "button", ...props }) {
  return (
    <StyledButton type={type} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  width: 200px;
  padding: 3px;
  margin-top: 20px;
  border: 3px solid;
  border-color: ${variables.BACKGROUND_COLOR_1};
  border-radius: 6px;
  outline: none;
  background-color: ${variables.BACKGROUND_COLOR_1};
  box-shadow: 3px 3px 5px hsla(0, 0%, 30%, 1);
  cursor: pointer;

  &:hover {
    border-color: ${variables.BACKGROUND_COLOR_14};
  }

  &:focus {
    border-color: ${variables.BACKGROUND_COLOR_14};
  }
`;
