import React, { useState } from "react";
import ax from "../conf/ax";

export default function CreateProductModal({ isOpen, onClose, fetchProducts }) {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        size: [],
        color: [],
        stock: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductData({ ...productData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // ถ้ามีหลายรูป
        if (Array.isArray(productData.image)) {
            productData.image.forEach((file) => {
                formData.append("files.image", file); // เพิ่มรูปหลายรูป
            });
        } else {
            formData.append("files.image", productData.image); // กรณีรูปเดียว
        }

        formData.append("data", JSON.stringify({
            name: productData.name,
            description: productData.description,
            price: Number(productData.price),
            size: productData.size.split(","),
            color: productData.color.split(","),
            stock: Number(productData.stock),
        }));

        try {
            const response = await ax.post("/products", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("✅ Product Created:", response.data);
            alert("Product Created Successfully!");
        } catch (error) {
            console.error("❌ Error creating product:", error.response?.data);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleChange} required className="border p-2 rounded" />
                    <textarea name="description" placeholder="Description" value={productData.description} onChange={handleChange} required className="border p-2 rounded" />
                    <input type="number" name="price" placeholder="Price" value={productData.price} onChange={handleChange} required className="border p-2 rounded" />
                    <input type="text" name="size" placeholder="Sizes (comma separated)" value={productData.size} onChange={handleChange} required className="border p-2 rounded" />
                    <input type="text" name="color" placeholder="Colors (comma separated)" value={productData.color} onChange={handleChange} required className="border p-2 rounded" />
                    <input type="number" name="stock" placeholder="Stock" value={productData.stock} onChange={handleChange} required className="border p-2 rounded" />
                    <input type="file" accept="image/*" onChange={handleImageChange} required className="border p-2 rounded" />

                    <div className="flex justify-between">
                        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
