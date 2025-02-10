import React from "react";
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
    <div className="w-4/12 lg:w-48 h-fit bg-white p-4 mx-5 mt-5 rounded-md border border-gray-200 shadow-md">
      <div className="text-md pb-2 font-medium text-gray-900">Categories</div>
      <div className="grid grid-cols-1 gap-2">
        {categories.map((category) => (
          <label key={category.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.title)}
              onChange={() => toggleCategory(category.title)}
              className="w-4 h-4 accent-gray-800 border-black focus:ring-black"
            />
            <span className="text-md text-gray-800">{category.title}</span>
          </label>
        ))}
      </div>

      <div className="py-6">
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
              className="h-2 bg-gray-200 rounded-full relative touch-none"
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
                className="w-4 h-4 bg-gray-800 border-2 border-gray-800 rounded-full cursor-pointer shadow-md transform"
              />
            );
          }}
        />
        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <span>฿{priceRange[0]}</span>
          <span>฿{priceRange[1]}</span>
        </div>
      </div>

      <div className="text-md pb-2 font-medium text-gray-900">Sizes</div>
      <div className="grid grid-cols-1 gap-2">
        {sizes.map((size, index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() => toggleSize(size)}
              className="w-4 h-4 accent-gray-800 border-black focus:ring-black"
            />
            <span className="text-md text-gray-800">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
