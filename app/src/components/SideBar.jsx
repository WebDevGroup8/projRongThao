import React, { useState } from "react";

export const SideBar = (props) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  return (
    <div className="w-48 bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold mb-3">Categories</h2>
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
    </div>
  );
};
