import React, { useState } from "react";
import { useNavigate } from "react-router";

export const ProductCard = (props) => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const image = props.image[0].url;

  // TODO : navigate to product detail page
  // const handleDetail = () => {
  //   navigate(`/product-detail/${props.id}`);
  // };

  return (
    <div
      // onClick={handleDetail}
      onMouseEnter={() => setAnimate(true)}
      onMouseLeave={() => setAnimate(false)}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between p-2"
    >
      <div className="relative aspect-square">
        <img
          src={`http://localhost:1337${image}`}
          alt={props.name}
          className={`w-64 h-48 object-cover rounded-xl transition-transform transform duration-500 ${
            animate ? "hover:scale-115" : ""
          }`}
        />
        <div>
          <h3 className="font-semibold text-lg  mt-2">{props.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-md text-gray-800">
              Size: {props.size.join(",")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-2 font-bold text-xl text-[#213555] transition-all duration-500 ">
        ฿ {props.price}
      </div>
    </div>
  );
};
