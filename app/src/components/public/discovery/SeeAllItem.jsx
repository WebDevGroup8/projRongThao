import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Loading from "@layout/Loading";
import ProductCard from "@public/discovery/ProductCard";
import SearchBar from "@public/discovery/SearchBar";
import SideBar from "@public/discovery/SideBar";
import ax from "@/conf/ax";
import fetchProducts from "@/utils/FetchProduct";
import { useSearchParams } from "react-router-dom";
import { endpoint } from "@/conf/main";

export default function SeeAllItem() {
  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await ax.get(endpoint.public.category.query());
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    try {
      setSearchTerm(searchParams.get("search") || "");
      setIsLoading(true);
      fetchCategories();
      fetchProducts(setProducts);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);
  const now = new Date();
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((product) =>
      selectedCategories.length > 0
        ? selectedCategories.every((selected) => {
            if (selected === "on sale") {
              const startDate = new Date(product.promotion?.start);
              const endDate = new Date(product.promotion?.end);
              const hasValidDiscount = product.promotion?.discountType;
              const isWithinDateRange = now >= startDate && now <= endDate;

              return hasValidDiscount && isWithinDateRange;
            }

            return product.categories?.some(
              (category) => category.title === selected,
            );
          })
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
    <div className="flex min-h-screen w-full min-w-fit bg-gray-50">
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
          <SearchBar
            searchTerm={searchTerm}
            onSearch={(term) => setSearchTerm(term)}
          />
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
                  promotion={product.promotion ? product.promotion : {}}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
