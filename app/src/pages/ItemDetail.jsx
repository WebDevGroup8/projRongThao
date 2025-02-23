import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPinned,
  Minus,
  Plus,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import { useNavigate, useParams } from "react-router-dom";
import conf from "../conf/mainapi";
import Loading from "../components/Loading";
import useAuthStore from "../store";

export const ExampleImg = ({ img }) => {
  const [key, setKey] = useState(0);
  return (
    <div className="relative mt-4 mb-8 flex h-80 w-full flex-col items-center lg:w-full">
      <div className="relative flex w-full justify-center lg:mt-10 lg:mb-5 lg:w-100 lg:flex-row lg:justify-center">
        {key > 0 && (
          <button
            className="t-0 absolute start-5 flex h-full items-center lg:-start-18"
            onClick={() => setKey(key - 1)}
          >
            <ChevronLeft size={80} strokeWidth={2} className="text-gray-400" />
          </button>
        )}
        <img
          src={`${conf.imageUrlPrefix}${img[key]}`}
          alt="รองเท้า"
          className="h-80 w-80 rounded-2xl border-4 border-gray-300 object-cover lg:h-100 lg:w-full"
        />
        {key < img.length - 1 && (
          <button
            className="absolute end-5 top-1/2 -translate-y-1/2 lg:-end-18"
            onClick={() => setKey(key + 1)}
          >
            <ChevronRight size={80} strokeWidth={2} className="text-gray-400" />
          </button>
        )}
      </div>

      <div className="mt-4 flex w-full flex-wrap justify-center gap-3 lg:mt-0">
        {img?.map((image, index) => (
          <button
            key={index}
            className="h-15 w-15 rounded-xl border-2 border-gray-300 object-cover focus:ring-1 focus:ring-black focus:outline-none lg:h-fit"
            onClick={() => setKey(index)}
          >
            <img
              src={`${conf.imageUrlPrefix}${image}`}
              alt="รองเท้า"
              className="aspect-square h-fit w-fit rounded-xl object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export const Detail = ({
  country,
  solds,
  price,
  shoeName,
  stock,
  promotion,
}) => {
  const [refinePrice, setRefinePrice] = useState(0);
  const [isPromotion, setIsPromotion] = useState(false);
  const now = new Date();
  const isPromotionValid = () => {
    if (promotion.name) {
      const startDate = new Date(promotion.start);
      const endDate = new Date(promotion.end);

      return now >= startDate && now <= endDate;
    }
    return false;
  };

  const promotionPrice = () => {
    if (isPromotionValid()) {
      setIsPromotion(true);
      if (promotion.discountType === "percentage") {
        return (price * (1 - promotion.percentage / 100)).toFixed(2);
      } else {
        return promotion.promotionPrice;
      }
    } else {
      return price;
    }
  };

  useEffect(() => {
    setRefinePrice(promotionPrice);
  }, []);
  return (
    <div className="mt-12 flex flex-col lg:mt-0 lg:gap-2">
      <div className="lg:mb-7">
        <p className="mt-2 mb-2 text-xl font-bold lg:mb-0 lg:text-2xl lg:text-black">
          {shoeName}
        </p>
      </div>
      {/* Price & Discount */}
      <div className="flex flex-row gap-3 lg:py-0">
        <p className="text-3xl font-bold text-blue-950">{refinePrice} ฿</p>
        <p className="font-thin line-through">
          {isPromotion ? price + "฿" : ""}
        </p>
        {isPromotion && promotion.discountType === "percentage" ? (
          <div className="me-3 h-fit w-fit rounded-md border-red-400 bg-red-100 px-1 py-0.5 text-xs font-semibold text-red-800 lg:px-2 lg:py-1">
            {promotion.percentage} %
          </div>
        ) : (
          isPromotion &&
          promotion.discountType === "fixed" && (
            <div className="me-3 h-fit w-fit rounded-md border-red-400 bg-red-100 px-1 py-0.5 text-xs font-semibold text-red-800 lg:px-2 lg:py-1">
              on sale
            </div>
          )
        )}
      </div>
      {/* Location & Sold Info */}
      <div className="flex flex-row gap-9">
        <div className="flex flex-row gap-15">
          <div className="flex flex-row gap-2">
            <MapPinned />
            <p>{country}</p>
          </div>
          <p>
            {solds} {solds <= 0 ? "Sold" : "Solds"}
          </p>
          <p>
            Total {stock} product{stock !== 1 ? "s" : ""} available.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Tag = ({ text }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {text?.map((text, index) => (
        <div
          key={index}
          className="border-folid w-fit rounded-md bg-blue-950 p-3 py-1 text-center"
        >
          <p className="text-center font-semibold text-white">{text}</p>
        </div>
      ))}

      <p className="text-center font-semibold text-white">{text}</p>
    </div>
  );
};

export const Description = ({ description }) => {
  const [isOpenDescription, setIsOpenDescription] = useState(true);
  return (
    <div className="relative flex flex-col justify-center gap-2 text-center">
      <hr className="bg-primarydark my-0 border-1"></hr>
      <button
        type="button"
        onClick={() => setIsOpenDescription(!isOpenDescription)}
      >
        <div className="flex w-full flex-row hover:text-blue-600">
          <div className="w-full justify-center hover:underline">
            Description
          </div>
          {!isOpenDescription && <Plus />}
          {isOpenDescription && <Minus />}
        </div>
      </button>
      {isOpenDescription && <hr className="bg-primarydark my-0 border-1"></hr>}

      {isOpenDescription && (
        <div className="flex w-fit flex-wrap px-6 text-left text-sm">
          {description.split("\n").map((line, index) => (
            <p key={index} className="mb-2">
              {line}
            </p>
          ))}
        </div>
      )}
      <hr className="bg-primarydark my-0 border-1"></hr>
    </div>
  );
};

export default function ItemDetail() {
  const [IsOpenSize, setIsOpenSize] = useState(false);
  const [IsOpenColor, setIsOpenColor] = useState(false);
  const [size, setSize] = useState("Value");
  const [color, setColor] = useState("Value");
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { cart, addToCart } = useAuthStore();
  const isItemInCart = cart.find((item) => item.id === Number(id));
  const { user } = useAuthStore();
  const fetchProduct = async () => {
    try {
      setIsLoading(true);

      const response = await ax.get(
        `/products?populate=image&populate=categories&filters[id]=${id}`,
      );
      setProduct(response.data.data[0]);
      setImages(response.data.data[0].image);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({ id: product.id });
      toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 3000,
        className: "mt-20",
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="mb-20 h-full w-full flex-wrap space-y-5 lg:mb-10 lg:px-20 lg:py-10">
      <div className="lg:flex lg:w-full lg:flex-row lg:justify-between">
        <div className="lg:w-full">
          <ExampleImg
            shoeName={product.name}
            img={images.map((image) => image.url)}
          />
        </div>
        <div className="flex flex-col gap-5 px-5 lg:w-1/2">
          {
            <Detail
              country="Thailand"
              solds={product.soldCount}
              price={product.price}
              stock={product.stock}
              shoeName={product.name}
              promotion={product.promotion ? product.promotion : {}}
            />
          }
          <Tag text={product.categories.map((category) => category.title)} />

          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between gap-12">
              <div className="relative flex w-84 flex-col gap-y-2">
                <p>Size</p>
                <button
                  onClick={() => setIsOpenSize(!IsOpenSize)}
                  className="inline-flex items-center rounded-lg border-1 bg-white px-5 py-2.5 text-center text-sm font-light text-black focus:ring-1 focus:ring-black focus:outline-none"
                  type="button"
                >
                  {size}
                  <div className="ms-auto">
                    <ChevronDown />
                  </div>
                </button>
                {IsOpenSize && (
                  <div className="absolute top-full mt-1 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm">
                    <ul className="py-2 text-sm text-gray-700">
                      {product.size.map((item, index) => (
                        <li key={index}>
                          <a
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              return setSize(item), setIsOpenSize(!IsOpenSize);
                            }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative flex w-84 flex-col gap-y-2">
                <p>Colors</p>
                <button
                  onClick={() => setIsOpenColor(!IsOpenColor)}
                  className="inline-flex items-center rounded-lg border-1 bg-white px-5 py-2.5 text-center text-sm font-light text-black focus:ring-1 focus:ring-black focus:outline-none"
                  type="button"
                >
                  {color}

                  <div className="ms-auto">
                    <ChevronDown />
                  </div>
                </button>
                {IsOpenColor && (
                  <div className="absolute top-full mt-1 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm">
                    <ul className="py-2 text-sm text-gray-700">
                      {product.color.map((item, index) => (
                        <li key={index}>
                          <a
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              return (
                                setColor(item), setIsOpenColor(!IsOpenColor)
                              );
                            }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-5">
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full cursor-pointer rounded-md border border-blue-950 px-4 py-2 text-center text-xl text-blue-950"
                >
                  <p className="hover:underline">PLEASE LOGIN TO ADD TO CART</p>
                </button>
              ) : isItemInCart ? (
                <button className="w-full cursor-pointer rounded-md border border-blue-950 px-4 py-2 text-center text-xl text-blue-950">
                  <p className="hover:underline">ITEM ALREADY IN CART</p>
                </button>
              ) : product.stock === 0 ? (
                <button className="w-full cursor-pointer rounded-md border border-blue-950 px-4 py-2 text-center text-xl text-blue-950">
                  <p className="hover:underline">OUT OF STOCK</p>
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full cursor-pointer rounded-md bg-blue-950 px-4 py-2 text-center text-xl text-white"
                >
                  <p className="hover:underline">ADD TO CART</p>
                </button>
              )}

              <button className="w-full cursor-pointer rounded-md bg-black px-4 py-2 text-center text-xl text-white">
                <p className="hover:underline">BUY IT NOW</p>
              </button>
            </div>

            <Description
              description="Unisex Scholl Sprinter Plus – Comfort Meets Style
✔ Breathable Design – Made with a lightweight mesh upper for maximum airflow, keeping your feet cool and dry all day.

✔ All-Day Comfort – Features a cushioned insole and shock-absorbing midsole to reduce strain on your feet and joints.

✔ Slip-Resistant Grip – The durable rubber outsole provides excellent traction on various surfaces, ensuring stability and safety.

✔ Versatile & Stylish – A sleek, modern design that pairs effortlessly with any casual or sporty outfit.

✔ Perfect for Any Activity – Whether you're walking, running errands, or hitting the gym, the Sprinter Plus offers the ideal blend of comfort, durability, and support.

"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
