import React from "react";

const StatusFilter = ({ statusOptions, selectedStatus, setSelectedStatus }) => {
  const toggleStatus = (name) => {
    setSelectedStatus((prev = []) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  return (
    <div className="rounded-md border border-gray-300 bg-white px-4 py-2 shadow-md focus:ring-2 focus:ring-gray-300 focus:outline-none">
      <div className="flex flex-row gap-2">
        {statusOptions.map((status, index) => (
          <label key={index} className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStatus.includes(status)}
              onChange={() => toggleStatus(status)}
              className="h-4 w-4 border-black accent-gray-800 focus:ring-black"
            />
            <span className="text-md text-gray-800">{status}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
