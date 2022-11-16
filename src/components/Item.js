import styled from "styled-components";
import { CartIcon2 } from "../Icons";
import { getLocaleStringFromNumber } from "../utils/helper";
import { FaTrashAlt, FaRegEdit, FaCartPlus } from "react-icons/fa";

export default function Item({ item, onCreate, onEdit, onDelete }) {
  return (
    <StyledArticle variante={item.inCart}>
      <Quantity>
        {getLocaleStringFromNumber(+item.quantity)} {item.unit}
      </Quantity>
      <Name>{item.name}</Name>
      <Desc>{item.description}</Desc>
      <Unitprice>{getLocaleStringFromNumber(+item.price)}</Unitprice>
      <Price>{getLocaleStringFromNumber(+item.price * +item.quantity)}</Price>

      <Actions id="actions">
        {item.inCart && !item.autoCreated && (
          <StyledFaEdit id="edit" onClick={() => onEdit(item.id)} />
        )}

        {item.inCart && !item.autoCreated && (
          <StyledFaTrashAlt id="delete" onClick={() => onDelete(item.id)} />
        )}

        {item.inCart || (
          <>
            {/* <CartIcon2 id="create" onClick={() => onCreate(item.id)} /> */}
            <StyledFaCartPlus id="create" onClick={() => onCreate(item.id)} />
          </>
        )}
      </Actions>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  display: grid;
  grid-template-columns: 2.6fr 6fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    "quantity name price"
    "desc desc unitprice"
    "desc desc actions";
  justify-content: stretch;
  margin: 8px;
  padding: 6px;
  background-color: ${(prop) =>
    prop.variante === true ? "hsl(216, 65%, 78%)" : "hsl(216, 65%, 85%)"};
  border-radius: 6px;
  border-style: solid;
  border-width: 2px;
  border-color: ${(prop) =>
    prop.variante === true ? "hsl(216, 65%, 68%)" : "hsl(216, 65%, 75%)"};

  :hover {
    border-color: hsl(216, 65%, 50%);
  }
`;

const Quantity = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  grid-area: quantity;
  text-align: left;
  border-bottom: 1px solid grey;
  padding-right: 2px;
  font-weight: bold;
`;
const Name = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  grid-area: name;
  text-align: left;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 0 4px;
  font-weight: bold;
`;
const Desc = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  grid-area: desc;
  text-align: left;
  border-right: 1px solid grey;
`;
const Unitprice = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  grid-area: unitprice;
  text-align: right;
  padding-left: 4px;
`;
const Price = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  grid-area: price;
  text-align: right;
  padding-left: 4px;
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  height: 30px;
`;

const StyledFaTrashAlt = styled(FaTrashAlt)`
  color: black;
  width: 26px;
  height: 24px;
  cursor: pointer;
`;

const StyledFaEdit = styled(FaRegEdit)`
  color: blue;
  width: 26px;
  height: 24px;
  cursor: pointer;
`;

const StyledFaCartPlus = styled(FaCartPlus)`
  color: darkgreen;
  width: 26px;
  height: 24px;
  cursor: pointer;
`;
