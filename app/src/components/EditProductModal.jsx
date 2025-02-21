import React, { useState, useEffect } from "react";
import ax from "../conf/ax";
import { X, Upload, ImageIcon } from "lucide-react";

export default function EditProductModal({ isOpen, onClose, fetchProducts, productId }) {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        size: "",
        color: "",
        stock: "",
    });

    const [existingImages, setExistingImages] = useState([]); // รูปภาพเดิม
    const [newImages, setNewImages] = useState([]); // รูปใหม่ที่อัปโหลด
    const [previewUrls, setPreviewUrls] = useState([]); // Preview ของรูปใหม่
    const [categories, setCategories] = useState([]); // หมวดหมู่ทั้งหมด
    const [selectedCategories, setSelectedCategories] = useState([]); // หมวดหมู่ที่เลือก

    // 📌 ดึงข้อมูลสินค้าเมื่อเปิด Modal
    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                const response = await ax.get(`/products/${productId}`);
                const product = response.data.data;

                setProductData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    size: product.size.join(","), // Convert array -> string
                    color: product.color.join(","),
                    stock: product.stock,
                });

                setExistingImages(product.image || []);
                setSelectedCategories(product.categories?.map(cat => cat.id) || []);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    // 📌 ดึง Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await ax.get("/categories");
                setCategories(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // 📌 อัปเดตค่าในฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // 📌 จัดการหมวดหมู่
    const handleCategorySelect = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        );
    };

    // 📌 เพิ่มรูปใหม่
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages([...newImages, ...files]);
        setPreviewUrls([...previewUrls, ...files.map((file) => URL.createObjectURL(file))]);
    };

    // 📌 ลบรูปที่อัปโหลดใหม่
    const removeNewImage = (index) => {
        setPreviewUrls(previewUrls.filter((_, i) => i !== index));
        setNewImages(newImages.filter((_, i) => i !== index));
    };

    // 📌 ลบรูปที่มีอยู่
    const removeExistingImage = (imageId) => {
        setExistingImages(existingImages.filter((img) => img.id !== imageId));
    };

    // 📌 อัปโหลดรูปใหม่
    const uploadImages = async () => {
        if (newImages.length === 0) return [];

        const formData = new FormData();
        newImages.forEach((file) => formData.append("files", file));

        try {
            const response = await ax.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data.map((file) => file.id);
        } catch (error) {
            console.error("❌ Error uploading images:", error);
            return [];
        }
    };

    // 📌 อัปเดตสินค้า
    const handleSubmit = async (e) => {
        e.preventDefault();

        const uploadedImageIds = await uploadImages();

        try {
            await ax.put(`/products/${productId}`, {
                data: {
                    ...productData,
                    price: Number(productData.price),
                    size: productData.size.split(","),
                    color: productData.color.split(","),
                    stock: Number(productData.stock),
                    image: [...existingImages.map((img) => img.id), ...uploadedImageIds],
                    categories: selectedCategories,
                },
            });

            alert("✅ Product Updated Successfully!");
            fetchProducts();
            onClose();
        } catch (error) {
            console.error("❌ Error updating product:", error);
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
                    {/* Image Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Product Images</label>

                        {/* Existing Images */}
                        <div className="flex flex-wrap gap-2">
                            {existingImages.map((img) => (
                                <div key={img.id} className="relative group w-fit h-fit">
                                    <img src={img.url} alt="Existing" className="w-40 h-40 object-cover rounded-md" />
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                        onClick={() => removeExistingImage(img.id)}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* New Image Upload */}
                        <div
                            className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative"
                            onClick={() => document.getElementById("images").click()}
                        >
                            {previewUrls.length === 0 && <ImageIcon className="h-16 w-16 text-gray-400" />}
                            <input id="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                        </div>

                        {/* Preview New Images */}
                        {previewUrls.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="relative group w-fit h-fit">
                                        <img src={url} alt="New" className="w-40 h-40 object-cover rounded-md" />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                            onClick={() => removeNewImage(index)}
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
                        <input name="name" value={productData.name} onChange={handleChange} required className="w-full p-2 border rounded-md" />
                        <textarea name="description" value={productData.description} onChange={handleChange} required className="w-full p-2 border rounded-md" />
                    </div>

                    <div className="col-span-full flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md shadow">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
