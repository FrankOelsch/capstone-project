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
  width: "200",
  height: "200",
  radius: "30",
};

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

  return (
    <UserContext.Provider
      value={{
        config,
        setConfig,
        configForSave,
        setConfigForSave,
        prevConfig,
        setPrevConfig,
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
