import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CategoryDetailSection from "../comp/CategorySelection";

const AddProductPage = () => {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  const [selection, setSelection] = useState({
    name: "DVD",
    attributes: {
      id: "size",
      units: "MB",
      options: [{ label: "Size (MB)", type: "number" }],
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
          options: [{ label: "Size (MB)", type: "number" }],
        },

        description: "Please, provide size.",
      },
      {
        name: "Furniture",
        attributes: {
          id: "dimensions",
          units: "CM",
          options: [
            { label: "Height (CM)", type: "number" },
            { label: "Width (CM)", type: "number" },
            { label: "Length (CM)", type: "number" },
          ],
        },
        description: "Please describe the dimensions in HxWxL Format.",
      },
      {
        name: "Book",
        attributes: {
          id: " weight",
          units: "KG",
          options: [{ label: "Weight (KG)", type: "number" }],
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
    const attrib = selection.attributes.id;

    const saveItem = { attrib, ...data };

    console.log(saveItem);
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
                    pattern: /[A-Za-z]./,
                    maxLength: 10,
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
