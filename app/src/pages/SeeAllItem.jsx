import React, { useEffect, useState } from "react";
import ax, { axData } from "../conf/ax";
import { ProductCard } from "../components/ProductCard";

export const SeeAllItem = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const fetchCategorires = async () => {
    try {
      const res = await ax.get(`/categories`);
      setCategory(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await ax.get(`/products`);
      setProduct(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategorires();
    fetchProducts();
  }, []);

  return (
    <>
      <div>
        {category &&
          category.map((category) => (
            <div key={category.id}>
              <h1>{category.title}</h1>
            </div>
          ))}
      </div>
      <div>
        {product &&
          product.map((product) => (
            // <div key={Product.id}>
            //   <h2>{Product.name}</h2>
            // </div>
            <ProductCard name={product.name} />
          ))}
      </div>
    </>
  );
};
