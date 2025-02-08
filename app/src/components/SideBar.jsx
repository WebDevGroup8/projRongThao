import React, { useState } from "react";
import { Range } from "react-range";

export const SideBar = ({
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
        : [...prev, categoryTitle]
    );
  };

  const toggleSize = (sizeNumber) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeNumber)
        ? prev.filter((c) => c !== sizeNumber)
        : [...prev, sizeNumber]
    );
  };
  return (
    <div className="w-48 h-fit bg-white p-4 mt-5 rounded-md border-gray-200 border-2">
      <div className="text-sm pb-2 font-medium text-gray-700">Categories</div>

      {categories.map((category) => (
        <div key={category.id} className="flex items-center">
          <input
            id={`category-${category.id}`}
            type="checkbox"
            checked={selectedCategories.includes(category.title)}
            onChange={() => toggleCategory(category.title)}
            className="w-5 h-5 m-1 accent-gray-800 border-black  focus:ring-black"
          />
          <label
            htmlFor={`category-${category.id}`}
            className="w-full p-1 ms-2 text-md text-gray-800 "
          >
            {category.title}
          </label>
        </div>
      ))}

      <div className="w-full max-w-md mx-auto py-6">
        <div className="text-sm pb-2 font-medium text-gray-700">Prices</div>
        <Range
          step={100}
          min={0}
          max={10000}
          values={priceRange}
          onChange={setPriceRange}
          renderTrack={({ props: trackProps, children }) => (
            <div
              {...trackProps}
              className="h-2 bg-gray-200 rounded-full relative"
            >
              <div
                className="absolute h-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
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
                className="w-3 h-3 bg-gray-800 border-2 border-gray-800 rounded-full cursor-pointer shadow-md transform"
              />
            );
          }}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>฿{priceRange[0]}</span>
          <span>฿{priceRange[1]}</span>
        </div>
      </div>
      <div className="text-sm pb-2 font-medium text-gray-700">Sizes</div>

      {sizes.map((size, index) => (
        <div key={index} className="flex items-center">
          <input
            id={size}
            type="checkbox"
            checked={selectedSizes.includes(size)}
            onChange={() => toggleSize(size)}
            className="w-5 h-5 m-1 accent-gray-800 border-black  focus:ring-black"
          />
          <label
            htmlFor={size}
            className="w-full p-1 ms-2 text-md text-gray-800 "
          >
            {size}
          </label>
        </div>
      ))}
    </div>
  );
};
