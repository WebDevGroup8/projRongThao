import React, { useState, useEffect } from "react";
import ax from "../conf/ax";
import SearchBar from "../components/SearchBar";
import { Trash2, Pencil } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await ax.get("/api/categories");
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter((category) =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="mt-10 w-full px-20">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">Manage Categories</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="text-white bg-primary hover:bg-primary-light font-semibold rounded-lg text-sm px-5 py-2.5"
                >
                    + Add New
                </button>
            </div>

            <SearchBar onSearch={(term) => setSearchTerm(term)} />

            <div className="relative overflow-x-auto mt-4">
                <table className="w-full text-left text-sm text-gray-500 shadow-2xl">
                    <thead className="border-1 border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                NAME
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                EDIT
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                DELETE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr key={category.id} className="border-b border-gray-200 bg-white">
                                <td className="px-6 py-4">{category.title}</td>
                                <td className="px-6 py-4 text-center">
                                    <Pencil
                                        size={40}
                                        onClick={() => handleEdit(category)}
                                        className="cursor-pointer rounded-lg p-2 text-primary transition-all duration-200 hover:bg-gray-200 hover:text-primary-light"
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Trash2
                                        size={40}
                                        onClick={() => handleDelete(category)}
                                        className="cursor-pointer rounded-lg p-2 text-red-500 transition-all duration-200 hover:bg-red-100 hover:text-red-700"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <AddCategoryModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                fetchCategories={fetchCategories}
            />
            <EditCategoryModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                category={selectedCategory}
                fetchCategories={fetchCategories}
            />
            <DeleteCategoryModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                category={selectedCategory}
                fetchCategories={fetchCategories}
            />
        </div>
    );
};

export default ManageCategory;