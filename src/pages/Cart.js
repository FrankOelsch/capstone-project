import { useState, useEffect } from "react";
import TextInput from "../components/input/TextInput";
import Item from "../components/Item";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

  const { search } = require("fast-fuzzy");

  const falseArray = [];
  const cartArray = [];

  useEffect(() => {
    if (!toggleID) return;
    setData(
      data.map((item) => {
        if (item.id === toggleID) {
          setToggleID("");
          return { ...item, inCart: !item.inCart };
        } else {
          return item;
        }
      })
    );
  }, [toggleID]);

  data.forEach((item) => {
    if (item.inCart) {
      cartArray.push(item);
    } else {
      falseArray.push(item);
    }
  });

  const filterArray = search(searchString, falseArray, {
    keySelector: (obj) => obj.name,
  });

  function getFilteredItems(e) {
    setSearchString(e.target.value);
  }

  function toggleItem(id) {
    setToggleID(id);
  }

  return (
    <>
      <Header />
      <Container>
        <StyledH2>Warenkorb:</StyledH2>
        <section className="cart">
          {cartArray.map((item) => (
            <Item
              id={item.id}
              key={item.id}
              name={item.name}
              price={item.price}
              inCart={item.inCart}
              onToggle={toggleItem}
            />
          ))}
        </section>

        <StyledH2>Artikel-Suche:</StyledH2>
        <TextInput id="searchInput" onInput={getFilteredItems} />
        <section className="shop">
          {filterArray.map((item) => (
            <Item
              id={item.id}
              key={item.id}
              name={item.name}
              price={item.price}
              inCart={item.inCart}
              onToggle={toggleItem}
            />
          ))}
        </section>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledH2 = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.4em;
  margin-top: 10px;
`;
