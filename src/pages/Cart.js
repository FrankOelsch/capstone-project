import { useState } from "react";

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

export default function Cart(toggleID) {
  const [data, setData] = useState(shopItems);

  const falseArray = [];
  const trueArray = [];

  data.forEach((item) => {
    if (item._id === toggleID) {
      item.inCart = !item.inCart;
    }
    if (item.inCart) {
      trueArray.push(item);
    } else {
      falseArray.push(item);
    }
  });

  console.log("trueArray: " + trueArray.length);
  console.log("falseArray: " + falseArray.length);
  console.log("toggleID: " + toggleID);

  return (
    <>
      <section>blub</section>
    </>
  );
}
