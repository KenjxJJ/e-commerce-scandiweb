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
              <Link to="/add-product" className="add-product-link">
                ADD
              </Link>
            </button>
            <button id="delete-product-btn">MASS DELETE</button>
          </div>
        </header>

        <div className="product-list-items">
          {data.map((product) => (
            <section className="product-list-item" key={product.product_id}>
              <span>
                <input
                  type="checkbox"
                  name="product-item-checkbox"
                  className="delete-checkbox"
                />
              </span>
              <span> {product.product_sku} </span>
              <span>{product.product_name}</span>
              <span>{product.product_price} $</span>
              <span>
                {product.category_name}: {product.category_value}
              </span>
            </section>
          ))}
        </div>
      </main>
    </>
  );
};

export default ProductsListPage;
