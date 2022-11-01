import Config from "./pages/Config";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Config />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
