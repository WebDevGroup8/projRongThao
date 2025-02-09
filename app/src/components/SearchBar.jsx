import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <form className="relative w-2/5">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="simple-search"
          className="bg-white placeholder-gray-500 border-gray-200 border-2 text-gray-800 text-sm rounded-md block w-full p-3 pr- m-5 "
          placeholder="Search"
          required
          onChange={(e) => onSearch(e.target.value)}
        />
        {/* Icon Search */}
        <div className="absolute inset-y-0 right-0.5 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
