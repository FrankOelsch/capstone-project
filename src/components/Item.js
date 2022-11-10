import styled from "styled-components";

export default function Item({ item, onToggle }) {
  return (
    <StyledArticle variante={item.inCart} onClick={() => onToggle(item.id)}>
      <Quantity>{item.quantity}</Quantity>
      <Unit>{item.unit}</Unit>
      <Name>{item.name}</Name>
      <Unitprice>{item.price}</Unitprice>
      <Price>{item.price}</Price>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  display: grid;
  grid-template-columns: 1fr 6fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    "quantity name unitprice"
    "unit name price";
  font-size: 1em;
  margin: 8px;
  padding: 6px;
  background-color: ${(prop) =>
    prop.variante === true ? "hsl(216, 65%, 80%)" : "hsl(34, 57%, 80%)"};
  border-radius: 6px;
  border-style: solid;
  border-width: 2px;
  border-color: ${(prop) =>
    prop.variante === true ? "hsl(216, 65%, 70%)" : "hsl(34, 57%, 70%)"};
  cursor: pointer;

  :hover {
    border-color: black;
  }
`;

const Quantity = styled.p`
  grid-area: quantity;
`;
const Unit = styled.p`
  grid-area: unit;
`;
const Name = styled.p`
  grid-area: name;
`;
const Unitprice = styled.p`
  grid-area: unitprice;
`;
const Price = styled.p`
  grid-area: price;
`;
