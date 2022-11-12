import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Measure from "./pages/Measure";
import Design from "./pages/Design";
import Home from "./pages/Home";
import { useLocalStorage } from "./useLocalStorage";
import { UserContext } from "./UserContext";

const DoorConfig = {
  system: "Sectionaltor",
  width: "250",
  height: "200",
  radius: "30",
  material: "Metall",
  design: "Sicke",
  wallColor: "#EAE6CA",
  doorColor: "#F6F6F6",
};

const PrevDoorConfig = {
  system: "Sectionaltor",
  width: "250",
  height: "200",
  radius: "30",
};

const CartItems = [
  {
    id: "1",
    name: "Sectionaltor",
    description: "Sectionaltor",
    unit: "qm",
    price: 300,
    quantity: 10,
    for: "Sectionaltor",
    inCart: true,
    autoCreated: true,
  },
  {
    id: "2",
    name: "Rundlauftor",
    description: "Rundlauftor",
    unit: "qm",
    price: 300,
    quantity: 10,
    for: "Rundlauftor",
    inCart: true,
    autoCreated: true,
  },
];

function App() {
  const [configForSave, setConfigForSave] = useLocalStorage(
    "DoorConfig",
    DoorConfig
  );
  const [config, setConfig] = useState(configForSave || DoorConfig);

  const [prevConfig, setPrevConfig] = useLocalStorage(
    "PrevDoorConfig",
    PrevDoorConfig
  );

  const [cartItems, setCartItems] = useLocalStorage("CartItems", CartItems);

  return (
    <UserContext.Provider
      value={{
        config,
        setConfig,
        configForSave,
        setConfigForSave,
        prevConfig,
        setPrevConfig,
        cartItems,
        setCartItems,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/measure" element={<Measure />} />
        <Route path="/design" element={<Design />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h1>Diese Seite existiert nicht</h1>} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
