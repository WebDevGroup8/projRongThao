import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ax from "../conf/ax";
import { ProductCard } from "../components/ProductCard";
import { SideBar } from "../components/SideBar";
import SearchBar from "../components/SearchBar";

export const SeeAllItem = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await ax.get(`/categories`);
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await ax.get(`/products?populate=image&populate=category`);
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category?.title === selectedCategory : true
    );

  return (
    <div className="flex bg-gray-100 min-h-screen p-4 px-50">
      <SideBar
        categories={categories}
        onSelectCategory={setSelectedCategory}
        className="p-4"
      />
      <div className="flex-1 px-4">
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ProductCard
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  stock={product.stock}
                  size={product.size}
                  color={product.color}
                  NEW={product.NEW}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
