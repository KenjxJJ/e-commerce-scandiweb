import React, { useEffect, useState } from "react";
import productService from "./service/productService";

function App() {
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
      <div>
        <h1>Hello</h1>
      </div>
      <div>
        {data.map((product) => (
          <div key={product.id}>
            <p> {product.id}</p>
            <p>{product.name}</p>
            <p>$ {product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
