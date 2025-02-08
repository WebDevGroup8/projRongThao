import React, { useState } from "react";
import { Range } from "react-range";

export const SideBar = (props) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  console.log(priceRange);
  return (
    <div className="w-48 bg-white p-4 shadow-md">
      <ul>
        {props.categories.map((category) => (
          <li
            key={category.id}
            className="cursor-pointer p-2 hover:bg-gray-200"
            onClick={() => props.onSelectCategory(category.title)}
          >
            {category.title}
          </li>
        ))}
      </ul>
      <div className="w-full max-w-md mx-auto py-6">
        <div className="text-sm pb-2">Price</div>
        <Range
          step={100}
          min={0}
          max={10000}
          values={priceRange}
          onChange={(newValues) => setPriceRange(newValues)}
          renderTrack={({ props, children }) => (
            <div {...props} className="h-2 bg-gray-200 rounded-full relative">
              <div
                className="absolute h-2 bg-linear-to-r from-sky-500 to-indigo-500 rounded-full"
                style={{
                  left: `${(priceRange[0] / 10000) * 100}%`,
                  right: `${100 - (priceRange[1] / 10000) * 100}%`,
                }}
              />
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="w-3 h-3 bg-gray-800 border-2 border-gray-800 rounded-full cursor-pointer shadow-md transform "
            />
          )}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{priceRange[0]}</span>
          <span>{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};
