import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer } from "./comp/Footer";
import ProductsListPage from "./pages/ProductsListPage";
import AddProductPage from "./pages/AddProductPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<ProductsListPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </Router>
      
      <Footer />
    </>
  );
};

export default App;
