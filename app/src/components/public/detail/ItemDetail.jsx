import "react-toastify/dist/ReactToastify.css";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPinned,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "@layout/Loading";
import ax from "@/conf/ax";
import { path, conf, endpoint } from "@/conf/main";
import { toast } from "react-toastify";
import useAuthStore from "@/store/store";
import Review from "@public/detail/Review";
import { loadStripe } from "@stripe/stripe-js";

export const ExampleImg = ({ images }) => {
  const [key, setKey] = useState(0);
  return (
    <div className="relative mt-4 mb-8 flex h-80 w-full flex-col items-center lg:w-full">
      <div className="relative flex w-full justify-center lg:mt-10 lg:mb-5 lg:w-100 lg:flex-row lg:justify-center">
        {key > 0 && (
          <button
            className="t-0 absolute start-5 flex h-full items-center lg:-start-18"
            onClick={() => {
              setKey(key - 1);
            }}
          >
            <ChevronLeft size={80} strokeWidth={2} className="text-gray-400" />
          </button>
        )}
        <img
          src={`${conf.imageUrlPrefix}${images[key]}`}
          alt="รองเท้า"
          className="h-80 w-80 rounded-2xl border-4 border-gray-300 object-cover lg:h-100 lg:w-full"
        />
        {key < images.length - 1 && (
          <button
            className="absolute end-5 top-1/2 -translate-y-1/2 lg:-end-18"
            onClick={() => {
              setKey(key + 1);
            }}
          >
            <ChevronRight size={80} strokeWidth={2} className="text-gray-400" />
          </button>
        )}
      </div>

      <div className="mt-4 flex w-full flex-wrap justify-center gap-3 lg:mt-0">
        {images?.map((img, index) => (
          <button
            key={index}
            className="h-15 w-15 rounded-xl border-2 border-gray-300 object-cover focus:ring-1 focus:ring-black focus:outline-none lg:h-fit"
          >
            <img
              src={`${conf.imageUrlPrefix}${img}`}
              alt="รองเท้า"
              className="aspect-square h-fit w-fit rounded-xl object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
const starNumber = [1, 2, 3, 4, 5];

export const Detail = ({
  country,
  solds,
  price,
  shoeName,
  promotion,
  reviews,
  averageRating,
}) => {
  const [refinePrice, setRefinePrice] = useState(0);
  const [isPromotion, setIsPromotion] = useState(false);
  const now = new Date();
  const isPromotionValid = () => {
    if (promotion?.name) {
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
      <div className="lg:mb-3">
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
        <div className="flex items-center">
          <div className="flex">
            {starNumber.map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-500">
            {averageRating.toFixed(1)} ({reviews.length} reviews)
          </span>
        </div>
        <div className="flex flex-row gap-10">
          <p>
            {solds} {solds <= 0 ? "Sold" : "Solds"}
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
    </div>
  );
};

export const Description = ({ description }) => {
  const [isOpenDescription, setIsOpenDescription] = useState(
    description ? true : false,
  );

  return (
    <div className="relative flex flex-col justify-center gap-2 text-center">
      <hr className="bg-primarydark my-0 border-1"></hr>

      <button
        type="button"
        onClick={() => setIsOpenDescription(!isOpenDescription)}
        className="flex w-full flex-row items-center justify-center gap-2 hover:text-blue-600"
      >
        <span className="hover:underline">Description</span>
        {isOpenDescription ? <Minus /> : <Plus />}
      </button>

      {isOpenDescription && (
        <>
          <hr className="bg-primarydark my-0 border-1"></hr>
          <div className="flex w-fit flex-wrap px-6 text-left text-sm">
            {description ? (
              description.split("\n").map((line, index) =>
                line.trim() ? (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ) : null,
              )
            ) : (
              <p className="text-gray-700">No description.</p>
            )}
          </div>
        </>
      )}

      <hr className="bg-primarydark my-0 border-1"></hr>
    </div>
  );
};

export default function ItemDetail() {
  const [IsOpenSize, setIsOpenSize] = useState(false);
  const [size, setSize] = useState("Select Size");
  const [sizeIndex, setSizeIndex] = useState(null);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const { id } = useParams();
  const { user, cart, addToCart } = useAuthStore();
  const location = useLocation();
  const { pathname, search } = location;

  // shipping
  const shipping = 150;

  const isItemInCart = cart.find(
    (item) => item.id === Number(id) && item.sizeIndex === sizeIndex,
  );
  const navigate = useNavigate();

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const handlePayment = async () => {
    if (size === "Select Size") {
      toast.error("Please select size before adding to cart!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const stripe = await stripePromise;
      // return;
      const productLine = {
        ...product,
        quantity: 1,
        selectedSize: size,
      };
      const response = await ax.post(endpoint.customer.order.create(), {
        userId: user.id,
        order_product: [productLine],
        amount_shipping: shipping,
      });

      // Extract session ID
      const sessionId = response.data?.stripeSession?.id;

      if (!sessionId) {
        throw new Error("Stripe session ID not received.");
      }
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      if (error.response.data?.error?.type === "coupon") {
        // TODO: implement toast
        toast.error("Invalid Coupon Code");
      }
      console.error("Payment Error:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      setIsLoading(true);

      const response = await ax.get(endpoint.public.product.get(id));
      setProduct(response.data.data[0]);
      setImages(response.data.data[0].image);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (size === "Select Size") {
      toast.error("Please select size before adding to cart!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        sizeIndex: sizeIndex,
      });

      toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 2000,
        className: "top-20",
      });
    } catch (e) {
      console.error("Error adding to cart:", e);

      toast.error("Failed to add item to cart. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
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
          <ExampleImg images={images.map((image) => image.url)} />
        </div>
        <div className="flex flex-col gap-5 px-5 lg:w-full">
          {
            <Detail
              reviews={reviews}
              country="Thailand"
              averageRating={averageRating}
              solds={product.soldCount}
              price={product.price}
              shoeName={product.name}
              promotion={product.promotion ? product.promotion : {}}
            />
          }
          <Tag text={product.categories.map((category) => category.title)} />

          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between gap-12">
              <div className="relative z-50 flex w-full flex-col gap-y-2">
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
                      {product.stock.map((size, index) => (
                        <li key={index}>
                          <a
                            className={`z-50 flex flex-row justify-between px-4 py-2 hover:bg-gray-100 ${size.stock <= 0 && `bg-gray-300 hover:bg-gray-400`}`}
                            onClick={() => {
                              if (size.stock > 0) {
                                setSizeIndex(index);
                                setSize(size.size);
                                setIsOpenSize(!IsOpenSize);
                              } else {
                                toast.error("Cannot select out of stock size");
                              }
                            }}
                          >
                            <p className="font-bold">{size.size} </p>
                            <span className="font-light text-gray-900">
                              ({size.stock} in stock)
                            </span>
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
                  onClick={() =>
                    navigate(
                      `${path.public.login}?previous=${pathname}${search}`,
                    )
                  }
                  className="w-full cursor-pointer rounded-md border border-blue-950 px-4 py-2 text-center text-xl text-blue-950"
                >
                  <p className="hover:underline">PLEASE LOGIN BEFORE BUY</p>
                </button>
              ) : isItemInCart ? (
                <button className="w-full cursor-pointer rounded-md border border-blue-950 px-4 py-2 text-center text-xl text-blue-950">
                  <p className="hover:underline">ITEM ALREADY IN CART</p>
                </button>
              ) : // TODO new stock checking logic
              product.stock === 0 ? (
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

              {user && (
                <button
                  onClick={handlePayment}
                  className="w-full cursor-pointer rounded-md bg-black px-4 py-2 text-center text-xl text-white"
                >
                  <p className="hover:underline">BUY IT NOW</p>
                </button>
              )}
            </div>

            <Description description={product.description} />
          </div>
        </div>
      </div>
      <Review
        user={user}
        productId={id}
        averageRating={averageRating}
        reviews={reviews}
        setReviews={setReviews}
        setAverageRating={setAverageRating}
      />
    </div>
  );
}
