import styled from "styled-components";

export default function Item({ id, name, price, inCart, onSelect }) {
  return (
    <StyledH3 variante={inCart} id={id} onClick={(e) => onSelect(e)}>
      {name + " - " + price + " € / qm"}
    </StyledH3>
  );
}

const StyledH3 = styled.h3`
  font-size: 1em;
  margin: 8px;
  padding: 6px;
  background-color: ${(prop) =>
    prop.variante === true ? "#61dafb" : "burlywood"};
  border-radius: 6px;
  height: 2.4em;
  border-style: solid;
  border-width: 2px;
  border-color: ${(prop) => (prop.variante === true ? "#61dafb" : "burlywood")};
  cursor: pointer;

  :hover {
    border-color: black;
  }
`;
