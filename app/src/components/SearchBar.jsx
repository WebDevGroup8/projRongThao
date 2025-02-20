import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="h-fit w-full max-w-md">
      <input
        type="search"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-md focus:ring-2 focus:ring-gray-300 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
