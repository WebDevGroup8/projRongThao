import React from "react";
import ax from "../conf/ax"; // ใช้ axios instance
import { X } from "lucide-react";

export default function DeleteProductModal({ isOpen, onClose, product, fetchProducts }) {
    if (!isOpen || !product) return null;

    const handleDelete = async () => {
        try {
            // 📌 1. ลบรูปภาพทั้งหมดก่อน
            if (product.image.length > 0) {
                await Promise.all(
                    product.image.map((img) => ax.delete(`/upload/files/${img.id}`))
                );
            }

            // 📌 2. ลบตัวสินค้าหลังจากรูปถูกลบแล้ว
            await ax.delete(`/products/${product.id}`);

            alert("✅ Product deleted successfully!");
            onClose(); // ปิด Modal
            fetchProducts(); // รีโหลดสินค้าหลังลบ
        } catch (error) {
            console.error("❌ Failed to delete product:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-red-600">Confirm Delete</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <p className="mt-4 text-gray-700">
                    Are you sure you want to delete <strong>{product.name}</strong>?
                    This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
