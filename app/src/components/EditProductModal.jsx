import React, { useState, useEffect } from "react";
import ax from "../conf/ax";
import { X, Upload, ImageIcon } from "lucide-react";
import conf from "../conf/mainapi";

export default function EditProductModal({ isOpen, onClose, product, fetchProducts }) {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        size: "",
        color: "",
        stock: "",
    });
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
                size: product.size?.join(", ") || "",
                color: product.color?.join(", ") || "",
                stock: product.stock || "",
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
                    const response = await ax.get("/categories");
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
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
        setPreviewUrls((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
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
            const response = await ax.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return [...existingImages.map((img) => img.id), ...response.data.map((file) => file.id)];
        } catch (error) {
            console.error("❌ Error uploading images:", error);
            throw error;
        }
    };

    const resetState = () => {
        setImages([]);
        setPreviewUrls([]);
        setExistingImages([]);
        setDeletedImages([]);
        setProductData({
            name: "",
            description: "",
            price: "",
            size: "",
            color: "",
            stock: "",
        });
        setSelectedCategories([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("Before save - images:", images, "deletedImages:", deletedImages, "existingImages:", existingImages);

            if (deletedImages.length > 0) {
                await Promise.all(
                    deletedImages.map(async (img) => {
                        try {
                            await ax.delete(`/upload/files/${img.id}`);
                            console.log(`Successfully deleted image ${img.id}`);
                        } catch (err) {
                            console.error(`Failed to delete image ${img.id}:`, err.response?.data || err);
                        }
                    })
                );
            }

            const uploadedImageIds = await uploadImages();

            if (uploadedImageIds.length === 0 && images.length > 0) {
                alert("❌ Image upload failed. Please try again.");
                setIsLoading(false);
                return;
            }

            const response = await ax.put(`/products/${product.documentId}`, {
                data: {
                    ...productData,
                    price: Number(productData.price),
                    size: productData.size.split(",").map((s) => s.trim()),
                    color: productData.color.split(",").map((c) => c.trim()),
                    stock: Number(productData.stock),
                    image: uploadedImageIds,
                    categories: selectedCategories,
                },
            });

            console.log("✅ Product Updated:", response.data);
            alert("🎉 Product Updated Successfully!");
            await fetchProducts();
            resetState();
            onClose();
        } catch (error) {
            console.error("❌ Error updating product:", error.response?.data || error);
            alert("❌ Failed to update product: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Edit Product</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Image Upload Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Product Images</label>
                        <div
                            className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative"
                            onClick={() => document.getElementById("images").click()}
                        >
                            {previewUrls.length === 0 && <ImageIcon className="h-16 w-16 text-gray-400" />}
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
                                className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary-light transition"
                            >
                                <Upload className="h-4 w-4" />
                            </button>
                        </div>
                        {previewUrls.length > 0 && (
                            <div className="flex flex-wrap gap-2 max-h-103 justify-start overflow-y-auto">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="relative group w-fit h-fit">
                                        <img src={url} alt={`preview-${index}`} className="w-40 h-40 object-cover rounded-md" />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
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
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                name="name"
                                type="text"
                                value={productData.name}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                name="price"
                                type="number"
                                value={productData.price}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                                <input
                                    name="size"
                                    type="text"
                                    value={productData.size}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. S, M, L"
                                    className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Colors</label>
                                <input
                                    name="color"
                                    type="text"
                                    value={productData.color}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Red, Blue"
                                    className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                name="stock"
                                type="number"
                                value={productData.stock}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Categories</label>
                            <div className="rounded-md mt-1 p-2 h-20 overflow-y-scroll shadow-sm">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`category-${category.id}`}
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={() => handleCategorySelect(category.id)}
                                        />
                                        <label htmlFor={`category-${category.id}`}>
                                            {category.title || "Unnamed"}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-primary text-white rounded-md shadow hover:bg-primary-light disabled:bg-gray-400"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}