import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 mt-5 "
      />
    </div>
  );
};

export default SearchBar;
