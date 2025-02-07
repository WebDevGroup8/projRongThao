import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export const ProductCard = (props) => {
  const image = props.image[0].url;
  const { navigate } = useNavigate();

  // TODO : navigate to product detail page
  // const handleDetail = () => {
  //   navigate(`/product-detail/${props.id}`);
  // };

  return (
    <div
      // onClick={handleDetail}

      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between p-2"
    >
      <div className="relative aspect-square">
        <img
          src={`http://localhost:1337${image}`}
          alt={props.name}
          className="w-64 h-44 object-cover rounded-xl transition-transform transform hover:scale-110"
        />
        <div>
          <h3 className="font-semibold text-md  mt-2">{props.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-800">
              Size: {props.size.join(",")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-1 font-bold text-lg text-[#213555]">
        ฿ {props.price}
      </div>
    </div>
  );
};
