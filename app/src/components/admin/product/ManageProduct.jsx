//import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react";
import SearchBar from "@public/discovery/SearchBar";
import ax from "@conf/ax";
import { EditableProductCard } from "@admin/product/EditableProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { FilterBarForManageProduct } from "@admin/product/FilterBarForManageProduct";
import CreateProductModal from "@admin/product/CreateProductModal";

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isLoading, setIsLoading] = useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  return (
    <div className="flex h-full flex-col px-10 py-10">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Product</h1>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)} // เปิด CreateModal
            className="bg-primary hover:bg-primary-light mt-5 w-full rounded-lg px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            + Create new
          </button>
        </div>
      </div>
      <div className="flex w-full flex-shrink-0 pb-5">
        <FilterBarForManageProduct
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
        />
      </div>
      {/* Grid แสดงสินค้า */}
      <div className="flex flex-row gap-5">
        <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <EditableProductCard
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
                  fetchProducts={fetchProducts} //ส่งฟังก์ชัน fetchProducts เข้าไป ปลายทางให้ deletemodal ใช้
                  documentId={product.documentId} //ใช้สำหรับลบ
                  promotion={product.promotion ? product.promotion : {}}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {/* Render Modal */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}
