import styled from "styled-components";

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
  border-color: hsl(216, 65%, 80%);

  border-radius: 6px;
  outline: none;
  background-color: aliceblue;
  box-shadow: 3px 3px 3px lightgrey;

  &:focus {
    border-color: hsl(216, 65%, 50%);
  }
`;
