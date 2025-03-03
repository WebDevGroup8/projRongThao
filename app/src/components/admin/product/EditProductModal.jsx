import { ImageIcon, Plus, Trash, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import ax from "@/conf/ax";
import { endpoint, conf } from "@/conf/main";
import { toast } from "react-toastify";
const defaultProductTempalte = {
  name: "",
  description: "",
  price: "",
  stock: [
    {
      size: "36",
      stock: 25,
    },
    {
      size: "38",
      stock: 25,
    },
    {
      size: "40",
      stock: 25,
    },
    {
      size: "42",
      stock: 25,
    },
    {
      size: "44",
      stock: 25,
    },
  ],
};
export default function EditProductModal({
  isOpen,
  onClose,
  product,
  fetchProducts,
}) {
  const [productData, setProductData] = useState(defaultProductTempalte);
  const [images, setImages] = useState([]); // รูปใหม่
  const [previewUrls, setPreviewUrls] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // รูปเก่าจาก Strapi
  const [deletedImages, setDeletedImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      setProductData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: Array.isArray(product?.stock)
          ? product.stock
          : defaultProductTempalte.stock,
        // stock: defaultProductTempalte.stock,
      });
      const existing = product.image || [];
      setExistingImages(existing);
      setPreviewUrls(existing.map((img) => `${conf.imageUrlPrefix}${img.url}`));
      setSelectedCategories(product.categories?.map((cat) => cat.id) || []);
      setImages([]);
      setDeletedImages([]);
      setIsLoading(false);

      const fetchCategories = async () => {
        try {
          const response = await ax.get(endpoint.admin.category.query());
          setCategories(response.data.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
    }
  }, [isOpen, product]);

  const handleCategorySelect = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id],
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };


  const removeImage = (index) => {
    // ถ้า index น้อยกว่าจำนวน existingImages แปลว่าเป็นรูปเก่า
    if (index < existingImages.length) {
      const removedImage = existingImages[index];
      setDeletedImages((prev) => [...prev, removedImage]);
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      // ถ้า index มากกว่าหรือเท่ากับ existingImages.length เป็นรูปใหม่
      const newImageIndex = index - existingImages.length;
      setImages((prev) => prev.filter((_, i) => i !== newImageIndex));
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const uploadImages = async () => {
    if (images.length === 0) {
      return existingImages.map((img) => img.id);
    }
    const formData = new FormData();
    images.forEach((file) => formData.append("files", file));
    try {
      const response = await ax.post(endpoint.admin.meida.upload(), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return [
        ...existingImages.map((img) => img.id),
        ...response.data.map((file) => file.id),
      ];
    } catch (error) {
      console.error("❌ Error uploading images:", error);
      throw error;
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
    setImages([]);
    setPreviewUrls([]);
    setExistingImages([]);
    setDeletedImages([]);
    setProductData(defaultProductTempalte);
    setSelectedCategories([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(
        "Before save - images:",
        images,
        "deletedImages:",
        deletedImages,
        "existingImages:",
        existingImages,
      );

      if (deletedImages.length > 0) {
        await Promise.all(
          deletedImages.map(async (img) => {
            try {
              await ax.delete(endpoint.admin.meida.delete(img.id));
              console.log(`Successfully deleted image ${img.id}`);
            } catch (err) {
              console.error(
                `Failed to delete image ${img.id}:`,
                err.response?.data || err,
              );
            }
          }),
        );
      }

      const uploadedImageIds = await uploadImages();

      if (uploadedImageIds.length === 0 && images.length > 0) {
        toast.error("❌ Image upload failed. Please try again.");
        setIsLoading(false);
        return;
      }

      const response = await ax.put(
        endpoint.admin.product.update(product.documentId),
        {
          data: {
            ...productData,
            price: Number(productData.price),
            stock: productData.stock,
            image: uploadedImageIds,
            categories: selectedCategories,
          },
        },
      );

      console.log("✅ Product Updated:", response.data);
      toast.success("🎉 Product Updated Successfully!");
      await fetchProducts();
      resetState();
      onClose();
    } catch (error) {
      console.error(
        "❌ Error updating product:",
        error.response?.data || error,
      );
      toast.error(
        "❌ Failed to update product: " +
        (error.response?.data?.message || "Unknown error"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Images
            </label>
            <div
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition hover:bg-gray-100"
              onClick={() => document.getElementById("images").click()}
            >
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
              <button
                type="button"
                className="bg-primary hover:bg-primary-light absolute right-2 bottom-2 rounded-full p-2 text-white shadow-md transition"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>
            {previewUrls.length > 0 && (
              <div className="flex max-h-103 flex-wrap justify-start gap-2 overflow-y-auto">
                {previewUrls.map((url, index) => (
                  <div key={index} className="group relative h-fit w-fit">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="h-40 w-40 rounded-md object-cover"
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
            {/* Size Stock */}
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <div className="h-20 overflow-y-auto">
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
              disabled={isLoading}
              className="bg-primary hover:bg-primary-light rounded-md px-6 py-2 text-white shadow disabled:bg-gray-400"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
