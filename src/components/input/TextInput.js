import styled from "styled-components";
import Theme from "../../Theme";

export default function TextInput(props) {
  const onFocus = (event) => {
    if (event.key === "Tab") {
      return false;
    }
    setTimeout(() => {
      event.target.select();
    }, 100);
  };

  return (
    <Theme>
      <div>
        <StyledInput
          type="text"
          autoComplete="off"
          onFocus={onFocus}
          {...props}
        />
      </div>
    </Theme>
  );
}

const StyledInput = styled.input`
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
