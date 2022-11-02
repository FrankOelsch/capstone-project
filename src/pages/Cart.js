import { useState, useRef } from "react";
import TextInput from "../components/input/TextInput";

const language = {
  SearchText: { de: "Artikel-Suche", en: "Search for items" },
  CartText: { de: "Warenkorb", en: "Shopping cart" },
};

const shopItems = [
  {
    name: "Decken-Sectionaltor Holz",
    qu: "qm",
    price: 180,
    quantity: 1,
    inCart: false,
  },
  {
    name: "Decken-Sectionaltor Stahl",
    qu: "qm",
    price: 120,
    quantity: 1,
    inCart: false,
  },
  { name: "Rundlauftor Holz", qu: "qm", price: 80, quantity: 1, inCart: false },
  {
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
    <>
      <label>
        {lang === "de" ? language.CartText.de : language.CartText.en}:
      </label>
      <section className="cart">
        {cartArray.map((e) => (
          <p>{e.name}</p>
        ))}
      </section>

      <label>
        {lang === "de" ? language.SearchText.de : language.SearchText.en}:
      </label>
      <br />
      <TextInput
        id="searchInput"
        ref={searchInput}
        onInput={getFilteredItems}
      />
      <section className="shop">
        {filterArray.map((e) => (
          <p>{e.name}</p>
        ))}
      </section>
    </>
  );
}
