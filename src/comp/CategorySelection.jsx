import React from "react";


// Category Selected Section
const CategoryDetailSection = ({ selectedItem, register, errors, show }) => {
  const _input = React.createRef();

  return (
    <>
      <div className="category-item">
        {selectedItem.attributes.options.map((item, index) => (
          <div key={index}>
            <label htmlFor={item.id}>
              {item.label} ({item.unit})
              <input
                id={item.label}
                defaultValue={" "}
                type={item.type}
                ref={_input}
                {...register(`${item.label}`, {
                  required: true,
                  min : 0
                })}
              />
            </label>
            {errors[item.label] && (
              <span className="text-error">
                Please, provide the data of indicated type.
              </span>
            )}
          </div>
        ))}
        {<span className="item-description">* {selectedItem.description}</span>}
      </div>
    </>
  );
};

export default CategoryDetailSection;
