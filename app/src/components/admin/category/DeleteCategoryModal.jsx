import React, { useState } from "react";
import ax from "@/conf/ax";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export default function DeleteCategoryModal({
  isOpen,
  onClose,
  category,
  fetchCategories,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await ax.delete(`/categories/${category.documentId}`);
      toast.success("✅ Category Deleted Successfully!");
      fetchCategories();
      onClose();
    } catch (error) {
      console.error("❌ Error deleting category:", error.response?.data);
      alert(
        "❌ Failed to delete category: " +
          (error.response?.data?.message || "Unknown error"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !category) return null;

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
          Are you sure you want to delete <strong>{category.title}</strong>?
          This action cannot be undone.
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
            disabled={isLoading}
            className="rounded-md bg-red-700 px-4 py-2 text-white transition hover:bg-red-600 disabled:bg-gray-400"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
