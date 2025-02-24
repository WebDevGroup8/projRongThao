import React from "react";
import { X } from "lucide-react";
import ax from "@/conf/ax";
import { toast } from "react-toastify";

export default function DeleteProductModal({
  isOpen,
  onClose,
  product,
  fetchProducts,
}) {
  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    try {
      //1. ลบรูปภาพทั้งหมดก่อน
      if (product.image.length > 0) {
        await Promise.all(
          product.image.map((img) => ax.delete(`/upload/files/${img.id}`)),
        );
      }
      //2. ลบตัวสินค้าหลังจากรูปถูกลบแล้ว
      await ax.delete(`/products/${product.documentId}`);
      toast.success("✅ Product deleted successfully!");

      await fetchProducts(); // ✅ รอให้ fetchProducts() เสร็จ ก่อนปิด Modal

      onClose(); // ✅ เรียกปิด Modal หลังจากโหลดข้อมูลเสร็จ
    } catch (error) {
      console.error("❌ Failed to delete product:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">Confirm Delete</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="mt-4 text-gray-700">
          Are you sure you want to delete <strong>{product.name}</strong>? This
          action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-400 px-4 py-2 text-white transition hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-700 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
