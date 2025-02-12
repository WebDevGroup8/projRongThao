import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ax from "../conf/ax";
import { ProductCard } from "../components/ProductCard";
import { SideBar } from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

export const SeeAllItem = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isLoading, setIsLoading] = useState(true);

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
        `/products?populate=image&populate=categories&populate=reviews`,
      );
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchCategories();
      fetchProducts();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((product) =>
      selectedCategories.length > 0
        ? product.categories?.some((category) =>
            selectedCategories.includes(category.title),
          )
        : true,
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    )
    .filter((product) =>
      selectedSizes.length > 0
        ? product.size.some((size) => selectedSizes.includes(size))
        : true,
    );

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden w-fit flex-shrink-0 lg:flex">
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

      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center">
        <div className="w-full flex-shrink-0 lg:hidden">
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
        <div className="mb-4 flex w-full flex-col items-center justify-between px-3 sm:flex-row lg:px-1">
          <SearchBar onSearch={(term) => setSearchTerm(term)} />
        </div>

        {/* Grid แสดงสินค้า */}
        <div className="grid w-full grid-cols-2 gap-5 px-3 md:grid-cols-3 lg:grid-cols-4 lg:px-1">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ProductCard
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  stock={product.stock}
                  size={product.size}
                  color={product.color}
                  categories={product.categories}
                  soldCount={product.soldCount}
                  reviews={product.reviews}
                  rating={product.rating}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
