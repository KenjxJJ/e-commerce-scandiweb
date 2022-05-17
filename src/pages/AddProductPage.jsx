import React, { useState } from "react";
import { Link } from "react-router-dom";

// Category Selected Section
const CategoryDetailSection = ({ selectedItem }) => {
  return (
    <>
      <div className="category-item">
        {selectedItem.options.map((item) => (
          <div key={item.id}>
            <label htmlFor={item.id}>{item.label}</label>
            <input id={item.id} type={item.type} />
          </div>
        ))}
        <span className="item-description">* {selectedItem.description}</span>
      </div>
    </>
  );
};

const AddProductPage = () => {
  const [selection, setSelection] = useState({
    name: "DVD",
    options: [
      {
        id: "size",
        label: "Size (MB)",
        type: "text",
        
      },
    ],
    description : "Please describe the size."
  });

  const changeProductType = (type) => {
    
    // OPTIONS
    const category_detail = [
      {
        name: "DVD",
        options: [
          {
            id: "size",
            label: "Size (MB)",
            type: "text",
          },
        ],
        description : "Please, provide size."
      },
      {
        name: "Furniture",
        options: [
          { label: "Height (CM)", type: "number" },
          { label: "Width (CM)", type: "number" },
          { label: "Length (CM)", type: "number" },
        ],
        description : "Please describe the dimensions in HxWxL Format."
      },
      {
        name: "Book",
        options: [{ label: "Weight (KG)", id: "book", type: "number" }],
        description : "Please, provide weight."
      },
    ];

    const selectedItem = category_detail.find((arrValue) => arrValue.name === type && type !== "Select the product type");
    setSelection(selectedItem);
  };

  return (
    <main className="products-list-main">
      <header>
        <div>
          <h1>Add Product</h1>
        </div>
        <div>
          <button id="add-product">
            <Link to="/add-product" className="add-product-link">
              Save
            </Link>
          </button>
          <button id="delete-product-btn">Cancel</button>
        </div>
      </header>

      <div className="add-product">
        <form id="product_form" action="create.php">
          <section className="general-product-details">
            <label htmlFor="sku">SKU
            <input id="sku" name="sku" type="text" />
            </label>
            <label htmlFor="name">Name
            <input name="name" id="name" type="text" />
            </label>

            <label htmlFor="price">Price ($) 
            <input id="price" name="price" type="text" />
            </label>
          
          </section>

          <section className="product-type-section">
            <label htmlFor="productType" name="product-type">
              Type Switcher
            </label>
            <select id="productType" onChange={(e)=>changeProductType(e.target.value)}>
               <option value="DVD">
                DVD
              </option>
              <option value="Furniture">Furniture</option>
              <option value="Book">Book</option>
            </select>

            {/* Display Selected Option */}
            <CategoryDetailSection selectedItem={selection} />

          </section>
        </form>
      </div>
    </main>
  );
};
export default AddProductPage;
