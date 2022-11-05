import styled from "styled-components";

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
    <>
      <StyledInput
        type="text"
        autoComplete="off"
        onFocus={onFocus}
        {...props}
      />
    </>
  );
}

const StyledInput = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  width: 200px;
  padding: 3px;
  border: 3px solid;
  border-color: burlywood;
  border-radius: 6px;
  outline: none;
  background-color: rgba(250, 235, 215, 0.41);
  box-shadow: 3px 3px 3px lightgrey;

  &:focus {
    background-color: lightblue;
    border-color: cadetblue;
  }
`;
