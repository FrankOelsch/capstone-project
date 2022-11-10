import { useState, useEffect, useContext } from "react";
import TextInput from "../components/input/TextInput";
import Item from "../components/Item";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../UserContext";

const shopItems = [
  {
    id: "1",
    name: "Zahnriemenantrieb für Sectionaltore, mit Funksteuerung 868MHz und 4-Kanal-Handsender",
    unit: "Stück",
    price: 720,
    quantity: 1,
    for: "sect",
    inCart: false,
  },

  {
    id: "2",
    name: "Spezialantrieb für Rundlauftore, mit Funksteuerung 868MHz, 4-Kanal-Handsender und Drucktaster",
    unit: "Stück",
    price: 920,
    quantity: 1,
    for: "rund",
    inCart: false,
  },

  {
    id: "3",
    name: "Zusätzlicher 4-Kanal-Handsender",
    unit: "Stück",
    price: 75,
    quantity: 1,
    for: "all",
    inCart: false,
  },

  {
    id: "4",
    name: "Funk-Codetaster Aufputz",
    unit: "Stück",
    price: 160,
    quantity: 1,
    for: "all",
    inCart: false,
  },

  {
    id: "5",
    name: "Schlüsselschalter Aufputz oder Unterputz",
    unit: "Stück",
    price: 79,
    quantity: 1,
    for: "all",
    inCart: false,
  },

  {
    id: "6",
    name: "Fingerscan-Schalter",
    unit: "Stück",
    price: 480,
    quantity: 1,
    for: "all",
    inCart: false,
  },

  {
    id: "7",
    name: "Funkempfänger für Fremdantriebe",
    unit: "Stück",
    price: 145,
    quantity: 1,
    for: "all",
    inCart: false,
  },

  {
    id: "8",
    name: "Notentriegelung (falls kein zweiter Zugang zur Garage)",
    unit: "Stück",
    price: 70,
    quantity: 1,
    for: "all",
    inCart: false,
  },

  {
    id: "9",
    name: "Gleichschließender Zylinder",
    unit: "Stück",
    price: 15,
    quantity: 1,
    for: "all",
    inCart: false,
  },

  {
    id: "10",
    name: "Schienenheizung komplett für Bodenschiene im Einfahrtsbereich",
    unit: "Stück",
    price: 540,
    quantity: 1,
    for: "rund",
    inCart: false,
  },

  {
    id: "11",
    name: "Dumnmy",
    unit: "Stück",
    price: 540,
    quantity: 1,
    for: "rund",
    inCart: false,
  },

  {
    id: "12",
    name: "Dumnmy",
    unit: "Stück",
    price: 540,
    quantity: 1,
    for: "rund",
    inCart: false,
  },
];

export default function Cart() {
  const { config, setConfig } = useContext(UserContext);

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
            <Item key={item.id} item={item} onToggle={toggleItem} />
          ))}
        </section>

        <StyledH2>Artikel-Suche:</StyledH2>
        <TextInput id="searchInput" onInput={getFilteredItems} />
        <section className="shop">
          {filterArray.map((item) => (
            <Item key={item.id} item={item} onToggle={toggleItem} />
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
