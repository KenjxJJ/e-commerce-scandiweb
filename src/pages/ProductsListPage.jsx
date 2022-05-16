import React, { useEffect, useState } from "react";
import productService from "../service/productService";
import { Link } from "react-router-dom";

const ProductsListPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    return () => {
      productService
        .getProducts()
        .then((res) => {
          const { data } = res; // Obtain data for response
          setData(data);
        })
        .catch((error) => console.log(error));
    };
  }, []);

  return (
    <>
      <main className="products-list-main">
        <header>
          <div>
            <h1>Product List</h1>
          </div>
          <div>
            <button id="add-product">
              <Link to="/add-product" className="add-product-link">ADD</Link>
            </button>
            <button id="delete-product-btn">MASS DELETE</button>
          </div>
        </header>

        <div className="product-list-items">
          {data.map((product) => (
            <section className="product-list-item" key={product.id}>
              <span>
                <input
                  type="checkbox"
                  name="product-item-checkbox"
                  className="delete-checkbox"
                />
              </span>
              <span> SKU </span>
              <span>{product.name}</span>
              <span>{product.price} $</span>
              <span>Category: {product.price}</span>
            </section>
          ))}
        </div>
      </main>
    </>
  );
};

export default ProductsListPage;
