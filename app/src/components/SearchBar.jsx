import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="w-full max-w-md">
      <input
        type="search"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="mt-5 w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-md focus:ring-2 focus:ring-gray-300 focus:outline-none"
        value={searchTerm}
      />
    </div>
  );
};

export default SearchBar;
