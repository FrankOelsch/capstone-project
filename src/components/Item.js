import styled from "styled-components";
import { getLocaleStringFromNumber } from "../utils/helper";
import { FaTrashAlt, FaRegEdit, FaCartPlus } from "react-icons/fa";
import * as variables from "../Variables";

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
          <StyledFaCartPlus id="create" onClick={() => onCreate(item.id)} />
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
  background-color: ${variables.BACKGROUND_COLOR_15};
  border-radius: 6px;
  border-style: solid;
  border-width: 3px;
  border-color: ${variables.BACKGROUND_COLOR_4};

  :hover {
    border-color: ${variables.BACKGROUND_COLOR_16};
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
  color: ${variables.BACKGROUND_COLOR_9};
  width: 23px;
  height: 21px;
  cursor: pointer;
  margin-left: 5px;
`;

const StyledFaEdit = styled(FaRegEdit)`
  color: ${variables.BACKGROUND_COLOR_10};
  width: 24px;
  height: 22px;
  cursor: pointer;
`;

const StyledFaCartPlus = styled(FaCartPlus)`
  color: ${variables.BACKGROUND_COLOR_11};
  width: 24px;
  height: 22px;
  cursor: pointer;
`;
