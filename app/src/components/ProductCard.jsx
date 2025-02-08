import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Star, MapPin } from "lucide-react";

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

  // TODO : navigate to product detail page
  // const handleDetail = () => {
  //   navigate(`/product-detail/${props.id}`);
  // };

  return (
    <div
      // onClick={handleDetail}
      onMouseEnter={() => setAnimate(true)}
      onMouseLeave={() => setAnimate(false)}
      className="bg-white rounded-md overflow-hidden border-2 border-gray-200 hover:shadow-xl transition-shadow flex flex-col p-4 h-80 justify-end"
    >
      <div className="relative aspect-square">
        <img
          src={`http://localhost:1337${image}`}
          alt={props.name}
          className={`w-64 h-40 object-cover rounded-sm transition-transform transform duration-500 ${
            animate ? "hover:scale-115" : ""
          }`}
        />
        <div>
          <h3 className="text-md  mt-2">{props.name}</h3>
          <div className="flex flex-row font-bold text-md text-[#213555] transition-all duration-500 ">
            ฿ {props.price}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {props.categories.map((category) => (
          <div
            key={category.title}
            className={`text-xs font-medium me-2 px-2.5 mt-1 rounded-sm w-fit border ${
              categoryColors[category.title.toLowerCase()] ||
              "bg-gray-100 text-gray-800 border-gray-400"
            }`}
          >
            {category.title}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
        <div className="flex items-center">
          <Star className="text-yellow-500 w-4 h-4 mr-1 fill-yellow-500" />
          <span className="font-medium">
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
