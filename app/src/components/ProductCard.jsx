import React, { useEffect } from "react";

export const ProductCard = (props) => {
  const image = props.image[0].url;
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative aspect-square">
        <img
          src={`http://localhost:1337${image}`}
          alt={props.name}
          className="w-64 h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{props.name}</h3>

        <div className="flex items-center mt-2">
          <div className="flex items-center text-yellow-400">
            <span className="ml-1">11</span>
          </div>
          <span className="text-gray-500 text-sm ml-1">( Reviews)</span>
        </div>

        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-600">thailand</span>
        </div>

        <div className="mt-3 font-bold">฿{props.price}</div>
      </div>
    </div>
  );
};
