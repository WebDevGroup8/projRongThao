import React from "react";

const SearchBar = (props) => {
  const handleInputChange = (e) => {
    props.onSearch(e.target.value); // ส่งค่าคำค้นหากลับไปยัง parent component
  };
  return (
    <form className="items-center w-2/5">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="bg-white placeholder-black border-gray-200 border-2 text-gray-900 text-sm rounded-lg block w-full  p-3 m-5 "
          placeholder="Search"
          required
          onChange={handleInputChange} // เรียกฟังก์ชันเมื่อมีการพิมพ์
        />
      </div>

      <svg
        className="absolute top-34 left-200 w-4 h-4"
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

      <span className="sr-only">Search</span>
    </form>
  );
};

export default SearchBar;
