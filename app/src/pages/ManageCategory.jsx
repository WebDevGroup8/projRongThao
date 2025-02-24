import React, { useState, useEffect } from "react";
import ax from "../conf/ax";
import SearchBar from "../components/SearchBar";
import { Trash2, Pencil } from "lucide-react";
import AddCategoryModal from "../components/AddCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await ax.get("/categories");
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
        <div className="mt-10 w-full px-10 pb-20">
            <h1 className="text-2xl font-semibold mb-6">Manage Categories</h1>

            {/* วาง SearchBar และ Add New ในแถวเดียวกัน */}
            <div className="flex justify-between items-center mb-8">
                <div className="w-1/2">
                    <SearchBar onSearch={(term) => setSearchTerm(term)} />
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="text-white bg-primary hover:bg-primary-light font-semibold rounded-lg text-sm px-5 py-2.5"
                >
                    + Add New
                </button>
            </div>

            {/* ตาราง */}
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-gray-500 shadow-2xl">
                    <thead className="border border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="w-1/10 px-6 py-3 text-left">
                                NAME
                            </th>
                            <th scope="col" className="w-7/10 px-6 py-3 text-left">
                                DESCRIPTION
                            </th>
                            <th scope="col" className="w-1/10 px-6 py-3 text-center">
                                EDIT
                            </th>
                            <th scope="col" className="w-1/10 px-6 py-3 text-center">
                                DELETE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <tr key={category.id} className="border-b border-gray-200 bg-white">
                                    <td className="px-6 py-4 text-base font-medium text-gray-900">
                                        {category.title}
                                    </td>
                                    <td className="px-6 py-4 text-base font-light text-gray-900">
                                        {category.detail}
                                    </td>
                                    <td className="flex px-6 py-4 justify-center">
                                        <Pencil
                                            size={27} // ปรับขนาด Icon
                                            onClick={() => handleEdit(category)}
                                            className="cursor-pointer rounded-lg p-1 text-primary transition-all duration-200 hover:bg-gray-200 hover:text-primary-light"
                                        />
                                    </td>
                                    <td className="ps-12 py-4 justify-center">
                                        <Trash2
                                            size={27} // ปรับขนาด Icon
                                            onClick={() => handleDelete(category)}
                                            className="cursor-pointer rounded-lg p-1 text-red-500 transition-all duration-200 hover:bg-red-100 hover:text-red-700"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                    No categories found
                                </td>
                            </tr>
                        )}
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