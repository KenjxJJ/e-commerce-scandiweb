import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CategoryDetailSection from "../comp/CategorySelection";
import productService from "../service/productService";

const AddProductPage = () => {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  // Route to the home page
  let navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);

  const [selection, setSelection] = useState({
    name: "DVD",
    attributes: {
      id: "size",
      units: "MB",
      options: [{ label: "size", type: "number", unit: "MB" }],
    },
    description: "Please, provide size.",
  });

  // Obtain value from the selection and store its ref
  const changeProductType = (type) => {
    // OPTIONS
    const category_detail = [
      {
        name: "DVD",
        attributes: {
          id: "size",
          units: "MB",
          options: [{ label: "size", type: "number", unit: "MB" }],
        },

        description: "Please, provide size.",
      },
      {
        name: "Furniture",
        attributes: {
          id: "dimensions",
          units: "CM",
          options: [
            { label: "height", type: "number", unit: "CM" },
            { label: "width", type: "number", unit: "CM" },
            { label: "length", type: "number", unit: "CM" },
          ],
        },
        description: "Please describe the dimensions in HxWxL Format.",
      },
      {
        name: "Book",
        attributes: {
          id: " weight",
          units: "KG",
          options: [{ label: "weight", type: "number", unit: "KG" }],
        },
        description: "Please, provide weight.",
      },
    ];

    const selectedItem = category_detail.find(
      (arrValue) => arrValue.name === type
    );

    setSelection(selectedItem);

    // To facilate the change of the input via onChange event by the select option
    unregister();
  };

  // Submit function
  const onSubmit = (data) => {
    const attributes = selection.attributes.id;

    const saveItem = { attributes, ...data };

    console.log(saveItem);

    productService
      .saveProduct(JSON.stringify(saveItem))
      .then((res) => {
        console.log("Sent Data", res);
        setIsSent(true);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });

    if (isSent) {
      // Route to home page
      navigate("/");
    }
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
            action="/create.php"
            method="POST"
          >
            {/* Product SKU Input */}
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
              {errors.sku && (
                <span className="text-error">Please check the SKU</span>
              )}
              {/* Product Name Input */}
              <label htmlFor="name">
                Name
                <input
                  name="name"
                  id="name"
                  type="text"
                  {...register("name", {
                    required: true,
                    pattern: /^([a-zA-Z]+ )+[a-zA-Z]+$|^[A-Za-z]+$/,
                  })}
                />
              </label>
              {errors.name && (
                <span className="text-error">Please check the name</span>
              )}

              {/* Price Input */}
              <label htmlFor="price">
                Price ($)
                <input
                  id="price"
                  name="price"
                  type="number"
                  {...register("price", {
                    required: true,
                    maxLength: 10,
                    min: 0,
                  })}
                />
              </label>
              {errors.price && (
                <span className="text-error">Please check the price</span>
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
            <div className="action-btn">
              <button type="submit">Save</button>
              <button type="cancel">
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
