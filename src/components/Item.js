import styled from "styled-components";

export default function Food({ id, name, price, onSelect, inCart }) {
  return (
    <StyledH3 variante={inCart} id={id} onClick={(e) => onSelect(e)}>
      {name + " - " + price + " € / qm"}
    </StyledH3>
  );
}

const StyledH3 = styled.h3`
  font-size: 20px;
  margin: 0;
  padding: 6px;
  background-color: ${(prop) =>
    prop.variante === true ? "#61dafb" : "burlywood"};
  border-radius: 6px;
  height: 26px;
  min-width: 80px;
  border-style: solid;
  border-width: 2px;
  border-color: ${(prop) => (prop.variante === true ? "#61dafb" : "burlywood")};
  cursor: pointer;

  :hover {
    border-color: black;
  }
`;
