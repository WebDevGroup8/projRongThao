import React from "react";
import { Range } from "react-range";

export const FilterBarForManageCategory = ({
    categories,
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
    selectedSizes,
    setSelectedSizes,
}) => {
    const sizes = [34, 36, 38, 40, 42, 44, 46];

    const toggleCategory = (categoryTitle) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryTitle)
                ? prev.filter((c) => c !== categoryTitle)
                : [...prev, categoryTitle],
        );
    };

    const toggleSize = (sizeNumber) => {
        setSelectedSizes((prev) =>
            prev.includes(sizeNumber)
                ? prev.filter((c) => c !== sizeNumber)
                : [...prev, sizeNumber],
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

            <div className="py-3">
                <div className="text-md pb-2 font-medium text-gray-900">Prices</div>
                <Range
                    step={100}
                    min={0}
                    max={10000}
                    values={priceRange}
                    onChange={setPriceRange}
                    renderTrack={({ props: trackProps, children }) => (
                        <div
                            {...trackProps}
                            className="relative h-2 mx-2 touch-none rounded-full bg-gray-200"
                        >
                            <div
                                className="absolute h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                                style={{
                                    left: `${(priceRange[0] / 10000) * 100}%`,
                                    right: `${100 - (priceRange[1] / 10000) * 100}%`,
                                }}
                            />
                            {children}
                        </div>
                    )}
                    renderThumb={({ props: thumbProps }) => {
                        const { key, ...rest } = thumbProps;
                        return (
                            <div
                                key={key}
                                {...rest}
                                className="h-4 w-4 transform cursor-pointer rounded-full border-2 border-gray-800 bg-gray-800 shadow-md"
                            />
                        );
                    }}
                />
                <div className="mt-2 flex justify-between text-sm text-gray-700">
                    <span>฿{priceRange[0]}</span>
                    <span>฿{priceRange[1]}</span>
                </div>
            </div>

            <div className="text-md pb-2 font-medium text-gray-900">Sizes</div>
            <div className="flex flex-wrap gap-5">
                {sizes.map((size, index) => (
                    <label key={index} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => toggleSize(size)}
                            className="h-4 w-4 border-black accent-gray-800 focus:ring-black"
                        />
                        <span className="text-md text-gray-800">{size}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
