import React, { useState, useEffect } from "react";
import ax from "../conf/ax";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export default function EditCategoryModal({ isOpen, onClose, category, fetchCategories }) {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && category) {
            setTitle(category.title);
            setDetail(category.detail);
        }
    }, [isOpen, category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);

        try {
            await ax.put(`/categories/${category.documentId}`, {
                data: {
                    title,
                    detail,
                },
            });
            toast.success("🎉 Category Updated Successfully!");
            fetchCategories();
            onClose();
        } catch (error) {
            console.error("❌ Error updating category:", error.response?.data);
            alert("❌ Failed to update category: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !category) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Edit Category</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category Name</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={detail}
                            onChange={(e) => setDetail(e.target.value)}
                            placeholder="Enter category details"
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div className="flex justify-end">
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