import styled from "styled-components";

export default function TextInput(props) {
  const onFocus = (e) => {
    if (e.which === 9) {
      return false;
    }
    setTimeout(() => {
      e.target.select();
    }, 100);
  };

  return (
    <StyledInput type="text" autoComplete="off" onFocus={onFocus} {...props} />
  );
}

const StyledInput = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  padding: 3px;
  border: 2px solid;
  border-color: burlywood;
  border-radius: 6px;
  outline: none;
  background-color: rgba(250, 235, 215, 0.41);

  &:focus {
    background-color: lightblue;
    border-color: cadetblue;
  }
`;
