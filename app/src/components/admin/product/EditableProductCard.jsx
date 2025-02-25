import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import DeleteProductModal from "@admin/product/DeleteProductModal";
import EditProductModal from "@admin/product/EditProductModal";
import { Star } from "lucide-react";
import { conf } from "@/conf/main";

export const EditableProductCard = (props) => {
  const [animate, setAnimate] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [refinePrice, setRefinePrice] = useState(0);
  const [isPromotion, setIsPromotion] = useState(false);

  const image = props.image?.[0]?.url || "/placeholder.png"; // ถ้าไม่มีรูปใช้ placeholder

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
  return (
    <div
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
          <Star className="mr-1 h-4 w-4 text-yellow-400" />
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
      <div
        onClick={(e) => {
          e.stopPropagation();
          setEditModalOpen(true); // ปิด EditModal ถ้ามันเปิดอยู่
          setDeleteModalOpen(false);
        }}
        className="mt-4 flex flex-row justify-between"
      >
        <button className="text-primary flex h-8 items-center justify-center space-x-2 rounded-md px-4 transition duration-200 ease-in-out hover:bg-gray-200">
          <Pencil className="h-4 w-4" />
          <span>Edit</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditModalOpen(false); // ปิด EditModal ถ้ามันเปิดอยู่
            setDeleteModalOpen(true);
          }}
          className="flex h-8 items-center justify-center space-x-2 rounded-md px-4 text-red-700 transition duration-200 ease-in-out hover:bg-gray-200"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
      {/* Delete Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        product={props}
        fetchProducts={props.fetchProducts} // ให้เรียก API ใหม่หลังลบ
      />
      {/* Edit Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={props}
        fetchProducts={props.fetchProducts}
      />
    </div>
  );
};
