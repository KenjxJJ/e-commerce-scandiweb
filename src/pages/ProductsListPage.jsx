import React, { useEffect, useState } from "react";
import productService from "../service/productService";
import { Link } from "react-router-dom";

const ProductsListPage = () => {
  const [data, setData] = useState([]);

  // Track the checked items
  const [checkedItemsById, setCheckedItemsById] = useState([]);

  // handle checked state
  const handleCheckedBoxChange = (e, id) => {

    // Record product ids to delete to store on true,
    //  or remove from the store if false 
    if (e.target.checked) {
      setCheckedItemsById([...checkedItemsById, id]);
    } else {
      const remainingCheckedItems = checkedItemsById.filter(
        (idValue) => idValue !== id
      );
      setCheckedItemsById(remainingCheckedItems);
    }
  };

  const massDeleteSelectedItems = () => {
    // Remove selected items
    const remainingData = data.filter((d, index) => {
      return d.product_id !== checkedItemsById[index];
    });

    // Set it to product data state
    setData(remainingData);

    // Update to the database so that on the next state is new replaced data
    productService.deleteProductsByIds(checkedItemsById);
  };

  useEffect(() => {
    // Fetch data from database via a service
    productService
      .getProducts()
      .then((res) => {
        const { data } = res; // Obtain data for response
        setData(data);
      })
      .catch((error) => console.log(error));
    
  }, [checkedItemsById]);

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
            <button id="delete-product-btn" onClick={massDeleteSelectedItems}>
              MASS DELETE
            </button>
          </div>
        </header>

        <div className="product-list-items">
          {data.map((product) => (
            <section className="product-list-item" key={product.product_id}>
              <span>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleCheckedBoxChange(e, product.product_id);
                  }}
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
