import { ImageIcon, Plus, Trash, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import ax from "@/conf/ax";
import { toast } from "react-toastify";
import { endpoint } from "@/conf/main";

const defaultProductTempalte = {
  name: "",
  description: "",
  price: "",
  stock: [
    {
      size: "36",
      stock: 0,
    },
    {
      size: "38",
      stock: 0,
    },
    {
      size: "40",
      stock: 0,
    },
    {
      size: "42",
      stock: 0,
    },
    {
      size: "44",
      stock: 0,
    },
  ],
};
export default function CreateProductModal({ isOpen, onClose, fetchProducts }) {
  const [productData, setProductData] = useState(defaultProductTempalte);

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [categories, setCategories] = useState([]); // เก็บ Category จาก Strapi
  const [selectedCategories, setSelectedCategories] = useState([]); // เก็บหมวดหมู่ที่เลือก
  const [isLoading, setIsLoading] = useState(false);

  // 📌 ดึง Categories จาก Strapi เมื่อเปิด Modal
  useEffect(() => {
    if (isOpen) {
      // เพิ่มเงื่อนไข isOpen
      const fetchCategories = async () => {
        try {
          const response = await ax.get(endpoint.admin.category.query());
          setCategories(response.data.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
      // เพิ่มการรีเซ็ต state
      setProductData(defaultProductTempalte);
      setImages([]);
      setPreviewUrls([]);
      setSelectedCategories([]);
      setIsLoading(false);
    }
  }, [isOpen]); // เปลี่ยน dependency จาก [] เป็น [isOpen]

  // 📌 ฟังก์ชันเลือก/ยกเลิกเลือกหมวดหมู่
  const handleCategorySelect = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((catId) => catId !== id)); // เอาออก
    } else {
      setSelectedCategories([...selectedCategories, id]); // เพิ่มเข้าไป
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    setPreviewUrls([
      ...previewUrls,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index) => {
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (images.length === 0) return [];

    const formData = new FormData();
    images.forEach((file) => formData.append("files", file));

    try {
      const response = await ax.post(endpoint.admin.meida.upload(), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      //มันจะ restpont image id ออกมา เเล้วเราก็เก็บเป็น array เเล้วยิงขึ้นไป
      return response.data.map((file) => file.id);
    } catch (error) {
      console.error("❌ Error uploading images:", error);
      return [];
    }
  };

  // --- SECTION: change stock ---
  const handleStockChange = (index, field, value) => {
    const newStock = [...productData.stock];
    newStock[index][field] =
      field === "stock" ? Math.max(0, parseInt(value)) || 0 : value;
    setProductData((prev) => ({
      ...prev,
      stock: newStock,
    }));
  };

  const addRow = () => {
    setProductData((prev) => ({
      ...prev,
      stock: [...prev.stock, { size: "", stock: 0 }],
    }));
  };

  const removeRow = (index) => {
    const newStock = productData.stock.filter((_, i) => i !== index);
    setProductData((prev) => ({
      ...prev,
      stock: newStock,
    }));
  };
  // --- END SECTION: change stock ---

  const resetState = () => {
    // เพิ่มฟังก์ชันนี้
    setProductData(defaultProductTempalte);
    setImages([]);
    setPreviewUrls([]);
    setSelectedCategories([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // เพิ่มเพื่อป้องกันการ submit ซ้ำ
    setIsLoading(true); // เพิ่มเพื่อตั้งสถานะ loading

    try {
      const uploadedImageIds = await uploadImages();
      if (uploadedImageIds.length === 0 && images.length > 0) {
        // ปรับเงื่อนไขให้ชัดเจน
        toast.error("❌ Upload failed. Please try again.");
        setIsLoading(false);
        return;
      }
      const response = await ax.post(endpoint.admin.product.create(), {
        data: {
          ...productData,
          price: Number(productData.price),
          stock: productData.stock,
          image: uploadedImageIds,
          categories: selectedCategories,
        },
      });
      console.log("✅ Product Created:", response.data);
      toast.success("🎉 Product Created Successfully!");
      await fetchProducts();
      resetState(); // เพิ่มเพื่อรีเซ็ต state
      onClose();
    } catch (error) {
      console.error("❌ Error creating product:", error);
      toast.error(
        "❌ Failed to create product: " +
        (error.response?.data?.message || "Unknown error"),
      );
    } finally {
      setIsLoading(false); // เพิ่มเพื่อรีเซ็ตสถานะ loading
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 grid gap-6 grid-cols-3"
        >

          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Images
            </label>

            {/* Upload Box */}
            <div
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition hover:bg-gray-100"
              onClick={() => document.getElementById("images").click()}
            >
              {/* แสดง ImageIcon ถ้ายังไม่มีรูป */}
              {previewUrls.length === 0 && (
                <ImageIcon className="h-16 w-16 text-gray-400" />
              )}

              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* ปุ่ม Upload ขนาดเล็ก */}
              <button
                type="button"
                className="bg-primary hover:bg-primary-light absolute right-2 bottom-2 rounded-full p-2 text-white shadow-md transition"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>

            {/* Preview Images */}
            {previewUrls.length > 0 && (
              <div className="flex max-h-70 flex-wrap justify-start gap-2 overflow-y-auto">
                {previewUrls.map((url, index) => (
                  <div key={index} className="group relative h-fit w-fit">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="h-35 w-35 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                name="name"
                type="text"
                value={productData.name}
                onChange={handleChange}
                required
                className="focus:ring-primary focus:border-primary w-full rounded-md border-gray-300 p-2 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                required
                className="focus:ring-primary focus:border-primary w-full rounded-md border-gray-300 p-2 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
                required
                className="focus:ring-primary focus:border-primary w-full rounded-md border-gray-300 p-2 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categories
              </label>
              <div className="flex flex-wrap gap-1.5 rounded-md p-3 shadow-sm">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="focus:ring-primary focus:border-primary me-4 flex flex-row items-center gap-1"
                  >
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategorySelect(category.id)}
                    />
                    <label htmlFor={`category-${category.id}`}>
                      {category.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div div className="space-y-4">
            {/* Size Stock */}
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <div className="h-75 overflow-y-auto">
              <table className="w-full text-left text-sm text-gray-500 shadow-sm rtl:text-right">
                <thead className="rounded border-1 border-gray-200 bg-gray-50 text-xs text-gray-700">
                  <tr>
                    <th className="border border-gray-200 px-2 py-1.5 text-center">
                      Size
                    </th>
                    <th className="border border-gray-200 px-2 py-1.5 text-center">
                      Stock
                    </th>
                    <th className="border border-gray-200 px-2 py-1.5 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {productData.stock.map((row, index) => (
                    <tr
                      key={index}
                      className="items-center border-b border-gray-200 bg-white"
                    >
                      <td className="border border-gray-200 p-2">
                        <input
                          type="text"
                          value={row.size}
                          onChange={(e) =>
                            handleStockChange(index, "size", e.target.value)
                          }
                          className="w-full rounded border p-1"
                        />
                      </td>
                      <td className="border border-gray-200 p-2">
                        <input
                          type="number"
                          value={row.stock}
                          onChange={(e) =>
                            handleStockChange(index, "stock", e.target.value)
                          }
                          className="w-full rounded border p-1"
                        />
                      </td>
                      <td className="items-center border border-gray-200 p-2 text-center">
                        <button
                          onClick={() => removeRow(index)}
                          className="w-fit items-center gap-1 rounded bg-red-500 px-2 py-2 text-center text-white"
                          disabled={productData.stock.length === 1}
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addRow}
              className="flex w-full items-center justify-center gap-1 rounded-md bg-blue-500 px-1 py-1 text-center font-normal text-white shadow-md"
            >
              <Plus size={20} /> Add Size
            </button>
          </div>

          <div className="col-span-full flex justify-end">
            <button
              type="submit"
              disabled={isLoading} // เพิ่มเพื่อ disable ปุ่ม khi loading
              className="bg-primary hover:bg-primary-light rounded-md px-6 py-2 text-white shadow disabled:bg-gray-400"
            >
              {isLoading ? "Creating..." : "Create"} {/* ปรับข้อความตามสถานะ */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
