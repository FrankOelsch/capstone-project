import styled from "styled-components";
import Theme from "../../Theme";

export default function Select({ onChange, onKeyDown, value, options, id }) {
  return (
    <Theme>
      <div>
        <StyledSelect
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          id={id}
        >
          {options.map((item) => (
            <option key={item.id} value={item.de}>
              {item.de}
            </option>
          ))}
        </StyledSelect>
      </div>
    </Theme>
  );
}

const StyledSelect = styled.select`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  width: 200px;
  padding: 3px;
  border: 3px solid;
  border-color: ${({ theme: { colors } }) => colors.inputBorder};

  border-radius: 6px;
  outline: none;
  background-color: ${({ theme: { colors } }) => colors.inputBackground};
  box-shadow: 3px 3px 3px lightgrey;

  &:focus {
    border-color: hsl(216, 65%, 50%);
  }
`;
