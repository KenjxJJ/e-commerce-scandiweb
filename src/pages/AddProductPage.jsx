import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// Category Selected Section
const CategoryDetailSection = ({ selectedItem, register, errors }) => {
  // let attribute = selectedItem.attribute;

  return (
    <>
      <div className="category-item">
        {selectedItem.options.map((item, index) => (
          <div key={index}>
            <label htmlFor={item.id}>
              {item.label}
              <input
                id={item.id}
                type={item.type}
                {...register(`${item.label}`, {
                  required: true,
                })}
              />
              {errors[item.label] && (
                <span className="text-error" style={{display: "block"}}>Please, provide the data of indicated type</span>
              )}
            </label>
          </div>
        ))}
        {<span className="item-description">* {selectedItem.description}</span>}
      </div>
    </>
  );
};

const AddProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selection, setSelection] = useState({
    name: "DVD",
    options: [
      {
        id: "size",
        label: "Size (MB)",
        type: "number",
      },
    ],
    description: "Please describe the size.",
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
            type: "number",
          },
        ],
        description: "Please, provide size.",
      },
      {
        name: "Furniture",
        options: [
          { label: "Height (CM)", type: "number" },
          { label: "Width (CM)", type: "number" },
          { label: "Length (CM)", type: "number" },
        ],
        description: "Please describe the dimensions in HxWxL Format.",
      },
      {
        name: "Book",
        options: [{ label: "Weight (KG)", id: "book", type: "number" }],
        description: "Please, provide weight.",
      },
    ];

    const selectedItem = category_detail.find(
      (arrValue) => arrValue.name === type
    );

    setSelection(selectedItem);
  };

  // Submit function
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <main className="product-add-item">
        <header>
          <div>
            <h1>Add Product</h1>
          </div>
        </header>
        <div className="add-product">
          <form
            id="product_form"
            onSubmit={handleSubmit(onSubmit)}
            action="create.php"
          >
            <section className="general-product-details">
              <label htmlFor="sku">
                SKU
                <input
                  id="sku"
                  name="sku"
                  type="text"
                  {...register("sku", {
                    required: true,
                    pattern: /[A-Z].[0-9]./,
                    maxLength: 10,
                  })}
                />
              </label>
              {errors.sku && <p className="text-error">Please check the SKU</p>}

              <label htmlFor="name">
                Name
                <input
                  name="name"
                  id="name"
                  type="text"
                  {...register("name", {
                    required: true,
                    maxLength: 10,
                  })}
                />
              </label>
              {errors.name && (
                <p className="text-error">Please check the name</p>
              )}

              <label htmlFor="price">
                Price ($)
                <input
                  id="price"
                  name="price"
                  type="number"
                  {...register("price", {
                    required: true,
                    maxLength: 10,
                  })}
                />
              </label>
              {errors.price && (
                <p className="text-error">Please check the price</p>
              )}
            </section>

            <section className="product-type-section">
              <label htmlFor="productType" name="product-type">
                Type Switcher
                <select
                  id="productType"
                  onChange={(e) => changeProductType(e.target.value)}
                >
                  <option value="DVD">DVD</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Book">Book</option>
                </select>
              </label>

              {/* Display Selected Option */}
              <CategoryDetailSection
                selectedItem={selection}
                register={register}
                errors={errors}
              />
            </section>

            {/* Submit / Cancel Buttons */}
            <div>
              <button type="submit">Save</button>
              <button>
                <Link to="/">Cancel</Link>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
export default AddProductPage;
