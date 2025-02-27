import React, { useEffect, useState } from "react";

import { Star } from "lucide-react";
import { conf, endpoint } from "@/conf/main";
import { useNavigate } from "react-router";
import { path } from "@/conf/main";
import ax from "@/conf/ax";

export default function ProductCard(props) {
  const [animate, setAnimate] = useState(false);
  const [reviews, setReviews] = useState();

  const [refinePrice, setRefinePrice] = useState(0);
  const [isPromotion, setIsPromotion] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await ax.get(endpoint.public.review.get(props.id));
      setReviews(res.data.data);
    } catch (error) {
      console.error("Error fetching Reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const navigate = useNavigate();

  const image = props.image?.[0]?.url || "/placeholder.png";

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

  const starColor = {
    5: "text-yellow-600 fill-yellow-600",
    4: "text-yellow-500 fill-yellow-500 ",
    3: "text-yellow-400 fill-yellow-400 ",
    2: "text-yellow-300 fill-yellow-300 ",
    1: "text-yellow-200 fill-yellow-200",
  };

  const handleDetail = () => {
    navigate(`${path.public.detail}/${props.id}`);
  };

  const now = new Date();
  const isPromotionValid = () => {
    if (props.promotion?.name) {
      const startDate = new Date(props.promotion.start);
      const endDate = new Date(props.promotion.end);

      return now >= startDate && now <= endDate;
    }
    return false;
  };

  const promotionPrice = () => {
    if (isPromotionValid()) {
      setIsPromotion(true);
      if (props.promotion.discountType === "percentage") {
        return (props.price * (1 - props.promotion.percentage / 100)).toFixed(
          2,
        );
      } else {
        return props.promotion.promotionPrice;
      }
    } else {
      return props.price;
    }
  };

  useEffect(() => {
    setRefinePrice(promotionPrice);
  }, []);

  const averageRating =
    reviews?.length > 0
      ? reviews?.reduce((acc, review) => acc + review.rating, 0) /
        reviews?.length
      : 0;

  return (
    <div
      onClick={handleDetail}
      onMouseEnter={() => setAnimate(true)}
      onMouseLeave={() => setAnimate(false)}
      className="flex min-h-65 flex-col justify-between overflow-hidden rounded-md border-2 border-gray-200 bg-white px-4 py-1 pb-4 transition-shadow hover:shadow-xl lg:min-h-90"
    >
      <div>
        <img
          src={`${conf.imageUrlPrefix}${image}`}
          alt={props.name}
          className={`h-[100px] w-full transform rounded-sm object-cover transition-transform duration-500 lg:h-[200px] ${
            animate ? "hover:scale-115" : ""
          }`}
        />
        <div className="mt-3">
          <h3 className="lg:text-md mb-2 text-sm">{props.name}</h3>
          {/* Price & Discount */}
          <div className="mb-2 flex flex-row gap-3 lg:py-0">
            <p className="text-sm font-bold text-blue-950 md:text-base">
              {refinePrice} ฿
            </p>
            <p className="text-xs font-thin line-through md:text-sm">
              {isPromotion ? props.price + "฿" : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">
          {isPromotion && props.promotion.discountType === "percentage" ? (
            <div className="me-3 h-fit w-fit rounded-md border-red-400 bg-red-100 px-1 py-0.5 text-xs font-semibold text-red-800 lg:px-2 lg:py-1">
              {props.promotion.percentage} %
            </div>
          ) : (
            isPromotion &&
            props.promotion.discountType === "fixed" && (
              <div className="me-3 h-fit w-fit rounded-md border-red-400 bg-red-100 px-1 py-0.5 text-xs font-semibold text-red-800 lg:px-2 lg:py-1">
                on sale
              </div>
            )
          )}

          {props.categories?.map((category) => (
            <div
              key={category.title}
              className={`mr-2 rounded-md bg-gray-200 px-1 py-0.5 text-xs font-medium text-gray-700 lg:px-2 lg:py-1 ${
                categoryColors[category.title.toLowerCase()] ||
                "border-gray-400 bg-gray-100 text-gray-800"
              }`}
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 flex flex-row justify-between text-xs text-gray-600">
        <div className="flex">
          <Star
            className={`mr-1 h-4 w-4 ${starColor[Math.round(averageRating)]}`}
          />
          <span>{averageRating.toFixed(1)}</span>

          <span className="ml-1 text-gray-500">
            ({reviews?.length} Reviews)
          </span>
        </div>
        <span>
          {props.soldCount <= 1
            ? `${props.soldCount} Sold`
            : `${props.soldCount} Solds`}
        </span>
      </div>
    </div>
  );
}
