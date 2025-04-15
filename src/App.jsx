import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart"; // Create later
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer /> {/* ✅ Global footer */}
    </BrowserRouter>
  );
}

export default App;