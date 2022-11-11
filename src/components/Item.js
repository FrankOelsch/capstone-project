import ReactTooltip from "react-tooltip";
import styled from "styled-components";

export default function Item({ item, onToggle }) {
  const myObj = {
    style: "currency",
    currency: "EUR",
  };
  return (
    <StyledArticle variante={item.inCart}>
      <Quantity>{(+item.quantity).toFixed(2)}</Quantity>
      <Unit>{item.unit}</Unit>
      <Name>{item.name}</Name>
      <Desc>{item.description}</Desc>
      <Unitprice>{(+item.price).toLocaleString(undefined, myObj)}</Unitprice>
      <Price>
        {(+item.price * +item.quantity).toLocaleString(undefined, myObj)}
      </Price>

      <Actions id="actions">
        <div id="edit">
          {item.inCart && <Edit data-tip data-for="ttedit"></Edit>}
          {item.inCart && (
            <ReactTooltip
              type="info"
              id="ttedit"
              place="top, left"
              effect="solid"
            >
              Bearbeiten
            </ReactTooltip>
          )}
        </div>
        <div id="delete">
          {item.inCart && (
            <Delete
              data-tip
              data-for="ttdelete"
              onClick={() => onToggle(item.id)}
            ></Delete>
          )}
          {item.inCart && (
            <ReactTooltip
              type="info"
              id="ttdelete"
              place="top, left"
              effect="solid"
            >
              Löschen
            </ReactTooltip>
          )}
        </div>
        <div id="create">
          {item.inCart || (
            <Create
              data-tip
              data-for="ttcreate"
              onClick={() => onToggle(item.id)}
            ></Create>
          )}
          {item.inCart || (
            <ReactTooltip
              type="info"
              id="ttcreate"
              place="top, left"
              effect="solid"
            >
              In Warenkorb
            </ReactTooltip>
          )}
        </div>
      </Actions>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  display: grid;
  grid-template-columns: 1.2fr 1fr 6fr 2.2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    "quantity unit name price price price"
    "desc desc desc unitprice unitprice unitprice"
    "desc desc desc create edit delete";
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
  grid-area: quantity;
  text-align: left;
  font-weight: bold;
`;
const Unit = styled.p`
  grid-area: unit;
  text-align: left;
  padding-right: 4px;
  font-weight: bold;
`;
const Name = styled.p`
  grid-area: name;
  text-align: left;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  padding: 0 4px;
  font-weight: bold;
`;
const Desc = styled.p`
  grid-area: desc;
  text-align: left;
  border-right: 1px solid grey;
`;
const Unitprice = styled.p`
  grid-area: unitprice;
  text-align: right;
  padding-left: 4px;
`;
const Price = styled.p`
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
  width: 24px;
  height: 16px;
  border-radius: 8px;
  border-style: none;
  background-color: blue;
  justify-self: end;
  margin-left: 4px;
  cursor: pointer;
`;

const Edit = styled.button`
  grid-area: edit;
  width: 24px;
  height: 16px;
  border-radius: 8px;
  border-style: none;
  background-color: green;
  justify-self: end;
  margin-left: 4px;
  cursor: pointer;
`;

const Delete = styled.button`
  grid-area: delete;
  width: 24px;
  height: 16px;
  border-radius: 8px;
  border-style: none;
  background-color: red;
  justify-self: end;
  margin-left: 4px;
  cursor: pointer;
`;
