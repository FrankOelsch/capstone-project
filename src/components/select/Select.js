import styled from "styled-components";
import Theme from "../../Theme";

export default function Select({ onChange, value, options, id }) {
  return (
    <Theme>
      <div>
        <StyledSelect onChange={onChange} value={value} id={id}>
          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
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
