import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Config from "./pages/Config";
import Config2 from "./pages/Config2";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/config" element={<Config />} />
      <Route path="/config2" element={<Config2 />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<h1>Diese Seite existiert nicht</h1>} />
    </Routes>
  );
}

export default App;
