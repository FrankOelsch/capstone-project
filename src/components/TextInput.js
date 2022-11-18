import { forwardRef } from "react";
import styled from "styled-components";
import * as variables from "../Variables";

const TextInput = forwardRef((props, ref) => {
  const onFocus = (event) => {
    if (event.key === "Tab") {
      return false;
    }
    // timeout is necessary for correctly function on smartphone
    setTimeout(() => {
      event.target.select();
    }, 100);
  };
  return (
    <div>
      <StyledInput
        type="text"
        autoComplete="off"
        onFocus={onFocus}
        {...props}
        ref={ref}
      />
    </div>
  );
});

const StyledInput = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1em;
  width: 200px;
  padding: 3px;
  border: 3px solid;
  border-color: ${variables.BACKGROUND_COLOR_6};
  border-radius: 6px;
  outline: none;
  background-color: ${variables.BACKGROUND_COLOR_5};
  box-shadow: 3px 3px 3px lightgrey;

  &:focus {
    border-color: ${variables.BACKGROUND_COLOR_3};
  }
`;

export default TextInput;
