import styled from "styled-components";
import * as variables from "../Variables";

export default function SelectWithLabel({
  onChange,
  value,
  options,
  id,
  labelText,
}) {
  if (!options || !Array.isArray(options) || options.length < 1) {
    options = [{ id: "0", name: "Keine Auswahl möglich" }];
  }

  if (!options[0].name || !options[0].id) {
    options = [{ id: "0", name: "Keine Auswahl möglich" }];
  }

  return (
    <StyledDiv>
      <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
      <StyledSelect onChange={onChange} value={value} id={id}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledSelect = styled.select`
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
