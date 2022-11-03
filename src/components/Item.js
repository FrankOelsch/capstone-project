import styled from "styled-components";

export default function Item({ id, name, price, inCart, onToggle }) {
  return (
    <StyledArticle variante={inCart} onClick={() => onToggle(id)}>
      {name + " - " + price + " € / qm"}
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
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
