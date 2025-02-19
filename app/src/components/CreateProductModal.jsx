import React, { useState } from "react";
import ax from "../conf/ax";

export default function CreateProductModal({ isOpen, onClose, fetchProducts }) {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        size: "",
        color: "",
        stock: "",
    });

    const [images, setImages] = useState([]); // เก็บไฟล์รูป
    const [previewUrls, setPreviewUrls] = useState([]); // เก็บ URL สำหรับแสดงรูป

    // อัปเดตค่าฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // เมื่อผู้ใช้เลือกไฟล์รูป
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // แปลง FileList เป็น Array
        setImages(files);

        // สร้าง URL สำหรับ preview รูป
        const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls(newPreviewUrls);
    };

    // อัปโหลดรูปไปยัง Strapi
    const uploadImages = async () => {
        if (images.length === 0) return [];

        const formData = new FormData();
        images.forEach((file) => formData.append("files", file));

        try {
            const response = await ax.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            return response.data.map((file) => file.id); // ดึง id ของรูปที่อัปโหลดสำเร็จ
        } catch (error) {
            console.error("❌ Error uploading images:", error);
            return [];
        }
    };

    // ส่งข้อมูลสินค้า
    const handleSubmit = async (e) => {
        e.preventDefault();

        // อัปโหลดรูปก่อน
        const uploadedImageIds = await uploadImages();

        // ถ้าอัปโหลดไม่สำเร็จให้หยุด
        if (uploadedImageIds.length === 0) {
            alert("❌ Upload failed. Please try again.");
            return;
        }

        // สร้างสินค้าโดยแนบ ID ของรูป
        try {
            const response = await ax.post("/products", {
                data: {
                    name: productData.name,
                    description: productData.description,
                    price: Number(productData.price),
                    size: productData.size.split(","),
                    color: productData.color.split(","),
                    stock: Number(productData.stock),
                    image: uploadedImageIds, // ส่ง ID ของรูป
                },
            });

            console.log("✅ Product Created:", response.data);
            alert("🎉 Product Created Successfully!");
            fetchProducts(); // โหลดรายการสินค้าใหม่
            onClose();
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

                    {/* อัปโหลดรูป */}
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} className="border p-2 rounded" />

                    {/* แสดงตัวอย่างรูป */}
                    <div className="flex gap-2 mt-2">
                        {previewUrls.map((url, index) => (
                            <img key={index} src={url} alt={`preview-${index}`} className="w-16 h-16 object-cover rounded border" />
                        ))}
                    </div>

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
