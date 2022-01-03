import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductList from "./pages/productList.jsx";
import Cart from "./pages/cart.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
