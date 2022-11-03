import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Config from "./pages/Config";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/config" element={<Config />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
