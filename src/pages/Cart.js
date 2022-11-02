import { useState, useRef } from "react";
import TextInput from "../components/input/TextInput";
import Item from "../components/Item";
import styled from "styled-components";

const shopItems = [
  {
    id: "1",
    name: "Decken-Sectionaltor Holz",
    qu: "qm",
    price: 180,
    quantity: 1,
    inCart: false,
  },
  {
    id: "2",
    name: "Decken-Sectionaltor Stahl",
    qu: "qm",
    price: 120,
    quantity: 1,
    inCart: false,
  },
  {
    id: "3",
    name: "Rundlauftor Holz",
    qu: "qm",
    price: 80,
    quantity: 1,
    inCart: false,
  },
  {
    id: "4",
    name: "Rundlauftor Aluminium",
    qu: "qm",
    price: 150,
    quantity: 1,
    inCart: false,
  },
];

export default function Cart() {
  const [data, setData] = useState(shopItems);
  const [searchString, setSearchString] = useState("");
  const [toggleID, setToggleID] = useState("");
  const [lang, setLang] = useState("de");

  const searchInput = useRef(null);

  const { search } = require("fast-fuzzy");

  const falseArray = [];
  const cartArray = [];

  data.forEach((item) => {
    if (item._id === toggleID) {
      item.inCart = !item.inCart;
    }
    if (item.inCart) {
      cartArray.push(item);
    } else {
      falseArray.push(item);
    }
  });

  console.log("cartArray: " + cartArray.length);
  console.log("falseArray: " + falseArray.length);
  console.log("toggleID: " + toggleID);

  const filterArray = search(searchString, falseArray, {
    keySelector: (obj) => obj.name,
  });

  function getFilteredItems(e) {
    console.log(e.target.value);
    setToggleID("");
    setSearchString(e.target.value);
  }

  return (
    <Container>
      <label>Warenkorb:</label>
      <section className="cart">
        {cartArray.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            inCart={item.inCart}
          />
        ))}
      </section>

      <label>Artikel-Suche:</label>
      <br />
      <TextInput
        id="searchInput"
        ref={searchInput}
        onInput={getFilteredItems}
      />
      <section className="shop">
        {filterArray.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            inCart={item.inCart}
          />
        ))}
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
