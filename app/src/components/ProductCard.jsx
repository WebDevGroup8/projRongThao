import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Star, MapPin } from "lucide-react";
import conf from "../conf/mainapi";

export const ProductCard = (props) => {
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  const image = props.image[0].url;

  const categoryColors = {
    limited: "bg-yellow-100 text-yellow-800 border-yellow-400",
    new: "bg-green-100 text-green-800 border-green-400",
    "on sale": "bg-red-100 text-red-800 border-red-400",
    sport: "bg-gray-100 text-gray-800 border-gray-400",
    "high top": "bg-purple-100 text-purple-800 border-purple-400",
    "mid top": "bg-indigo-100 text-indigo-800 border-indigo-400",
    "low top": "bg-blue-100 text-blue-800 border-blue-400",
    platform: "bg-orange-100 text-orange-800 border-orange-400",
    heel: "bg-teal-100 text-teal-800 border-teal-400",
  };

  const handleDetail = () => {
    navigate(`/customer/product/${props.id}`);
  };

  return (
    <div
      onClick={handleDetail}
      onMouseEnter={() => setAnimate(true)}
      onMouseLeave={() => setAnimate(false)}
      className="flex flex-col bg-white rounded-md overflow-hidden border-2 border-gray-200 hover:shadow-xl transition-shadow px-4 py-1 pb-4  justify-between min-h-65 lg:min-h-90"
    >
      <div>
        <img
          src={`${conf.imageUrlPrefix}${image}`}
          alt={props.name}
          className={`w-full h-[100px] lg:h-[200px] object-cover rounded-sm transition-transform transform duration-500 ${
            animate ? "hover:scale-115" : ""
          }`}
        />
        <div className="mt-2">
          <h3 className="text-sm lg:text-md mb-2">{props.name}</h3>
          <p className="text-sm lg:text-md font-bold text-[#213555] mb-2">
            ฿{props.price}
          </p>
        </div>
        <div className="flex flex-wrap">
          {props.categories.map((category) => (
            <div
              key={category.title}
              className={`px-1 py-0.5 lg:px-2 lg:py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full ${
                categoryColors[category.title.toLowerCase()] ||
                "bg-gray-100 text-gray-800 border-gray-400"
              }`}
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between text-xs text-gray-600 mt-1">
        <div className="flex ">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>
            {/* {props.rating} */}
            4.5
          </span>

          <span className="ml-1 text-gray-500">
            {/* {props.reviews.length} */}
            (5.1k Reviews)
          </span>
        </div>
        <span>
          {/* {props.soldCount}  */}
          2.51k Solds
        </span>
      </div>
    </div>
  );
};
