import styled from "styled-components";
import * as variables from "../Variables";

export default function Select({ onChange, value, options, id }) {
  if (!options || !Array.isArray(options) || options.length < 1) {
    options = [{ id: "0", name: "Keine Auswahl möglich" }];
  }

  if (!options[0].name || !options[0].id) {
    options = [{ id: "0", name: "Keine Auswahl möglich" }];
  }

  return (
    <div>
      <StyledSelect onChange={onChange} value={value} id={id}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
}

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
