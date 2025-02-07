import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import { ProductCard } from "../components/ProductCard";

export const SeeAllItem = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await ax.get(`/categories`);
      setCategory(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await ax.get(`/products?populate=image`);
      setProduct(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen p-4 px-50">
      <div className="w-1/ bg-white shadow-md rounded-lg p-4 overflow-y-auto h-[80vh]">
        <h2 className="text-lg font-bold mb-4">Category</h2>
        <ul className="space-y-2">
          {category.map((cat) => (
            <li
              key={cat.id}
              className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
            >
              {cat.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Grid */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">All item</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {product.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              size={product.size}
              color={product.color}
              NEW={product.NEW}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
