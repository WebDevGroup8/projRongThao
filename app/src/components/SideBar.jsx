import React, { useState } from "react";
import { Range } from "react-range";

export const SideBar = ({
  categories,
  priceRange,
  setPriceRange,
  onSelectCategory,
}) => {
  return (
    <div className="w-48 bg-white p-4 shadow-md rounded-md">
      {/* Category List */}
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="cursor-pointer p-2 hover:bg-gray-200 rounded-md transition"
            onClick={() => onSelectCategory(category.title)}
          >
            {category.title}
          </li>
        ))}
      </ul>
      <div className="w-full max-w-md mx-auto py-6">
        <div className="text-sm pb-2 font-medium text-gray-700">Price</div>
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
          renderThumb={({ props: thumbProps }) => (
            <div
              {...thumbProps}
              className="w-3 h-3 bg-gray-800 border-2 border-gray-800 rounded-full cursor-pointer shadow-md transform -translate-y-1/2"
            />
          )}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>฿{priceRange[0]}</span>
          <span>฿{priceRange[1]}</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};
