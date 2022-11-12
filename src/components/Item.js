import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { getLocaleString } from "./helper";

export default function Item({ item, onCreate, onEdit, onDelete }) {
  return (
    <StyledArticle variante={item.inCart}>
      <Quantity>
        {getLocaleString(+item.quantity)} {item.unit}
      </Quantity>
      <Name>{item.name}</Name>
      <Desc>{item.description}</Desc>
      <Unitprice>{getLocaleString(+item.price)}</Unitprice>
      <Price>{getLocaleString(+item.price * +item.quantity)}</Price>

      <Actions id="actions">
        {item.inCart && (
          <div id="edit">
            <Edit
              data-tip
              data-for="ttedit"
              onClick={() => onEdit(item.id)}
            ></Edit>
            <ReactTooltip id="ttedit" type="info">
              Bearbeiten
            </ReactTooltip>
          </div>
        )}

        {item.inCart && !item.autoCreated && (
          <div id="delete">
            <Delete
              data-tip
              data-for="ttdelete"
              onClick={() => onDelete(item.id)}
            ></Delete>
            <ReactTooltip id="ttdelete" type="info">
              Löschen
            </ReactTooltip>
          </div>
        )}

        {item.inCart || (
          <div id="create">
            <Create
              data-tip
              data-for="ttcreate"
              onClick={() => onCreate(item.id)}
            ></Create>
            <ReactTooltip id="ttcreate" type="info">
              In Warenkorb
            </ReactTooltip>
          </div>
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

  :hover {
    border-color: black;
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
`;

const Create = styled.button`
  grid-area: create;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-style: none;
  background-color: blue;
  justify-self: end;
  margin-left: 4px;
  cursor: pointer;
`;

const Edit = styled.button`
  grid-area: edit;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-style: none;
  background-color: green;
  justify-self: end;
  margin-left: 4px;
  cursor: pointer;
`;

const Delete = styled.button`
  grid-area: delete;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-style: none;
  background-color: red;
  justify-self: end;
  margin-left: 4px;
  cursor: pointer;
`;
