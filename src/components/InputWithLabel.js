import { forwardRef } from "react";
import styled from "styled-components";
import * as variables from "../Variables";

const InputWithLabel = forwardRef((props, ref) => {
  //   console.log(props.labelText);

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
    <StyledDiv>
      <StyledLabel htmlFor={props.id}>{props.labelText}</StyledLabel>
      <StyledInput
        type="text"
        autoComplete="off"
        onFocus={onFocus}
        {...props}
        ref={ref}
      />
    </StyledDiv>
  );
});

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledInput = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1em;
  width: 200px;
  padding: 3px;
  border: 3px solid;
  border-color: ${variables.BACKGROUND_COLOR_1};
  border-radius: 6px;
  outline: none;
  background-color: ${variables.BACKGROUND_COLOR_2};
  box-shadow: 3px 3px 5px hsla(0, 0%, 40%, 1);

  &:focus {
    border-color: ${variables.BACKGROUND_COLOR_14};
  }
`;

const StyledLabel = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  padding-top: 4px;
  padding-bottom: 2px;
`;

export default InputWithLabel;
