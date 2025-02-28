import { Range } from "react-range";
import React, { useEffect, useState } from "react";

const groupAvailableSizes = (products) => {
  // console.log(products);
  return products?.reduce((grouped, product) => {
    product.stock.forEach(({ size, stock }) => {
      if (stock > 0) {
        grouped[size] = (grouped[size] || 0) + 1;
      }
    });
    return grouped;
  }, {});
};

export default function SideBar({
  categories,
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedSizes,
  setSelectedSizes,
  products,
}) {
  const [availableSizes, setAvailableSizes] = useState({});

  useEffect(() => {
    setAvailableSizes(groupAvailableSizes(products));
  }, [products]);

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
    <div className="mx-2 mt-5 h-fit w-auto rounded-md border border-gray-200 bg-white p-4 shadow-md lg:min-h-screen lg:w-48">
      <div className="text-md pb-2 font-medium text-gray-900">Categories</div>
      <div className="grid grid-cols-3 gap-2 lg:min-h-70 lg:grid-cols-1">
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
              className="relative h-2 touch-none rounded-full bg-gray-200"
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
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
        {products &&
          Object.entries(availableSizes).map(([size, stock], index) => (
            <label
              key={index}
              className="flex flex-row items-center gap-2 lg:justify-between"
            >
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="h-4 w-4 border-black accent-gray-800 focus:ring-black"
                />
                <p>{size}</p>
              </div>
              <p className="text-xs text-gray-700">({stock} available)</p>
            </label>
          ))}
      </div>
    </div>
  );
}
