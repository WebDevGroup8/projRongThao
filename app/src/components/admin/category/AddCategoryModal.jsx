import React, { useState } from "react";
import ax from "@/conf/ax";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export default function AddCategoryModal({ isOpen, onClose, fetchCategories }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      await ax.post("/categories", {
        data: {
          title,
          detail,
        },
      });
      toast.success("🎉 Category Created Successfully!");
      fetchCategories();
      onClose();
    } catch (error) {
      console.error("❌ Error creating category:", error.response?.data);
      alert(
        "❌ Failed to create category: " +
          (error.response?.data?.message || "Unknown error"),
      );
    } finally {
      setIsLoading(false);
      setTitle("");
      setDetail("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="focus:ring-primary focus:border-primary w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Enter category details"
              className="focus:ring-primary focus:border-primary w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary-light rounded-md px-6 py-2 text-white shadow disabled:bg-gray-400"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
