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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      const res = await ax.get(
        `/products?populate=image&populate=categories&populate=reviews`
      );
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
      selectedCategories.length > 0
        ? product.categories?.some((category) =>
            selectedCategories.includes(category.title)
          )
        : true
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .filter((product) =>
      selectedSizes.length > 0
        ? product.size.some((size) => selectedSizes.includes(size))
        : true
    );

  return (
    <div className="flex bg-gray-50 min-h-screen p-4">
      {isSidebarOpen && (
        <div className="flex-shrink-0">
          <SideBar
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
          />
        </div>
      )}

      <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mt-5 sm:mb-0 lg:hidden text-gray-800 bg-white border-2 border-gray-300 p-2 rounded-md"
          >
            {isSidebarOpen ? "Close Filters" : "Open Filters"}
          </button>
          <SearchBar onSearch={(term) => setSearchTerm(term)} />
        </div>

        {/* Grid แสดงสินค้า */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
