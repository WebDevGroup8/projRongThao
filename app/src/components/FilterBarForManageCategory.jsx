import React from "react";
import { Range } from "react-range";

export const FilterBarForManageCategory = ({
    categories,
    selectedCategories,
    setSelectedCategories,
}) => {

    const toggleCategory = (categoryTitle) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryTitle)
                ? prev.filter((c) => c !== categoryTitle)
                : [...prev, categoryTitle],
        );
    };

    return (
        <div className=" h-fit w-full rounded-md border border-gray-200 bg-white p-4 shadow-md ">
            <div className="text-md pb-2 font-medium text-gray-900">Categories</div>
            <div className="flex flex-wrap gap-5 ">
                {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.title)}
                            onChange={() => toggleCategory(category.title)}
                            className="h-4 w-4 border-black accent-gray-800 focus:ring-black"
                        />
                        <span className="text-md text-gray-800">{category.title}</span>
                    </label>
                ))}
            </div>

        </div>
    );
};
