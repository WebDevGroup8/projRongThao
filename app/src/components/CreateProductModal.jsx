import React, { useState, useEffect } from "react";
import ax from "../conf/ax"
import { X, Upload, ImageIcon } from "lucide-react"

export default function CreateProductModal({ isOpen, onClose, fetchProducts }) {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        size: "",
        color: "",
        stock: "",
    })

    const [images, setImages] = useState([])
    const [previewUrls, setPreviewUrls] = useState([])
    const [categories, setCategories] = useState([]); // เก็บ Category จาก Strapi
    const [selectedCategories, setSelectedCategories] = useState([]); // เก็บหมวดหมู่ที่เลือก
    const [isLoading, setIsLoading] = useState(false);

    // 📌 ดึง Categories จาก Strapi เมื่อเปิด Modal
    useEffect(() => {
        if (isOpen) { // เพิ่มเงื่อนไข isOpen
            const fetchCategories = async () => {
                try {
                    const response = await ax.get("/categories");
                    setCategories(response.data.data);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            };
            fetchCategories();
            // เพิ่มการรีเซ็ต state
            setProductData({
                name: "",
                description: "",
                price: "",
                size: "",
                color: "",
                stock: "",
            });
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
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([...images, ...files])
        setPreviewUrls([...previewUrls, ...files.map((file) => URL.createObjectURL(file))])
    }

    const removeImage = (index) => {
        setPreviewUrls(previewUrls.filter((_, i) => i !== index))
        setImages(images.filter((_, i) => i !== index))
    }

    const uploadImages = async () => {
        if (images.length === 0) return []

        const formData = new FormData()
        images.forEach((file) => formData.append("files", file))

        try {
            const response = await ax.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            return response.data.map((file) => file.id)
        } catch (error) {
            console.error("❌ Error uploading images:", error)
            return []
        }
    }

    const resetState = () => { // เพิ่มฟังก์ชันนี้
        setProductData({
            name: "",
            description: "",
            price: "",
            size: "",
            color: "",
            stock: "",
        });
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
            if (uploadedImageIds.length === 0 && images.length > 0) { // ปรับเงื่อนไขให้ชัดเจน
                alert("❌ Upload failed. Please try again.");
                setIsLoading(false);
                return;
            }
            const response = await ax.post("/products", {
                data: {
                    ...productData,
                    price: Number(productData.price),
                    size: productData.size.split(",").map((s) => s.trim()), // ปรับให้ trim ช่องว่าง
                    color: productData.color.split(",").map((c) => c.trim()),
                    stock: Number(productData.stock),
                    image: uploadedImageIds,
                    categories: selectedCategories,
                },
            });
            console.log("✅ Product Created:", response.data);
            alert("🎉 Product Created Successfully!");
            await fetchProducts();
            resetState(); // เพิ่มเพื่อรีเซ็ต state
            onClose();
        } catch (error) {
            console.error("❌ Error creating product:", error.response?.data);
            alert("❌ Failed to create product: " + (error.response?.data?.message || "Unknown error")); // ปรับข้อความ alert
        } finally {
            setIsLoading(false); // เพิ่มเพื่อรีเซ็ตสถานะ loading
        }
    };

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Create New Product</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Image Upload Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Product Images</label>

                        {/* Upload Box */}
                        <div
                            className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative"
                            onClick={() => document.getElementById("images").click()}
                        >
                            {/* แสดง ImageIcon ถ้ายังไม่มีรูป */}
                            {previewUrls.length === 0 && <ImageIcon className="h-16 w-16 text-gray-400" />}

                            <input id="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />

                            {/* ปุ่ม Upload ขนาดเล็ก */}
                            <button
                                type="button"
                                className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary-light transition"
                            >
                                <Upload className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Preview Images */}
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
                                <label className="block text-sm font-medium text-gray-700">Sizes (Number)</label>
                                <input
                                    name="size"
                                    type="text"
                                    value={productData.size}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. XX, YY, ZZ"
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
                            <div className=" rounded-md mt-1 p-2 h-20 overflow-y-scroll shadow-sm">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center gap-2 focus:ring-primary focus:border-primary">
                                        <input
                                            type="checkbox"
                                            id={`category-${category.id}`}
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={() => handleCategorySelect(category.id)}
                                        />
                                        <label htmlFor={`category-${category.id}`}>{category.title}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading} // เพิ่มเพื่อ disable ปุ่ม khi loading
                            className="px-6 py-2 bg-primary text-white rounded-md shadow hover:bg-primary-light disabled:bg-gray-400"
                        >
                            {isLoading ? "Creating..." : "Create"} {/* ปรับข้อความตามสถานะ */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
