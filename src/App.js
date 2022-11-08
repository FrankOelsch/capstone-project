import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Config from "./pages/Config";
import Config2 from "./pages/Config2";
import Home from "./pages/Home";
import { useLocalStorage } from "./useLocalStorage";

const DoorConfig = {
  system: "Sectionaltor",
  width: "250",
  height: "200",
  radius: "30",
};

function App() {
  const [configForSave, setConfigForSave] = useLocalStorage(
    "DoorConfig",
    DoorConfig
  );

  const [config, setConfig] = useState(configForSave || DoorConfig);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              config={config}
              setConfig={setConfig}
              configForSave={configForSave}
              setConfigForSave={setConfigForSave}
            />
          }
        />
        <Route
          path="/config"
          element={
            <Config
              config={config}
              setConfig={setConfig}
              configForSave={configForSave}
              setConfigForSave={setConfigForSave}
            />
          }
        />
        <Route
          path="/config2"
          element={
            <Config2
              config={config}
              setConfig={setConfig}
              configForSave={configForSave}
              setConfigForSave={setConfigForSave}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              config={config}
              setConfig={setConfig}
              configForSave={configForSave}
              setConfigForSave={setConfigForSave}
            />
          }
        />
        <Route path="*" element={<h1>Diese Seite existiert nicht</h1>} />
      </Routes>
    </>
  );
}

export default App;
