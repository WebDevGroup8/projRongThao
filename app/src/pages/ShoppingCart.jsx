import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ax from "../conf/ax";
import useAuthStore from "../store";
import Loading from "../components/Loading";
import conf from "../conf/mainapi";
export default function ShoppingCart() {
  const { cart, updateCartItem, removeFromCart } = useAuthStore();
  const [cartItems, setCartItems] = useState(cart);
  const [isLoading, setIsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(subtotal);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
    updateCartItem(id, change);
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    removeFromCart(id);
  };

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const response = await ax.post("/orders", {
        order_product: cartItems,
      });

      // Correct way to extract session ID
      const sessionId = response.data?.stripeSession?.id;

      if (!sessionId) {
        throw new Error("Stripe session ID not received.");
      }

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const productRequests = cartItems.map((item) =>
        ax
          .get(
            `/products?populate=image&populate=categories&filters[id]=${item.id}`,
          )
          .then((response) => ({
            ...response.data,
            quantity: item.quantity,
          })),
      );

      const responses = await Promise.all(productRequests);
      // Extracting the data from responses
      const products = responses.map((response) => ({
        ...response.data[0],
        quantity: response.quantity,
      }));
      setCartItems(products);

      const newSubtotal = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      setSubtotal(newSubtotal);
      if (cartItems?.length !== 0) {
        // TODO: remove hard code
        const newShipping = 150;
        const newDiscountPercentage = 10;
        const newDiscount = newSubtotal * (newDiscountPercentage / 100);
        const newTotal = newSubtotal + newShipping - newDiscount;
        setShipping(newShipping);
        setDiscountPercentage(newDiscountPercentage);
        setDiscount(newDiscount);
        setTotal(newTotal);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen w-full">
      {/* Main Content */}
      <main className="w-full px-4 py-8">
        <h2 className="mb-8 text-xl font-bold text-gray-800">
          🛒 Your Shopping Cart
        </h2>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems?.length === 0 ? (
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <p className="text-xl font-semibold text-gray-600">
                  Your cart is empty
                </p>
                <p className="mt-2 text-gray-500">
                  Add some items to get started!
                </p>
              </div>
            ) : (
              cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg sm:flex-row sm:p-6"
                >
                  <img
                    src={
                      `${conf.imageUrlPrefix}${item?.image?.[0]?.url}` ||
                      "/placeholder.svg"
                    }
                    alt={item.name}
                    className="mb-4 h-24 w-24 rounded-md object-cover sm:mb-0"
                  />
                  <div className="ml-0 flex-1 text-center sm:ml-4 sm:text-left">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  </div>
                  <div className="mt-4 flex items-center space-x-15 sm:mt-0">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="cursor-pointer rounded p-1 hover:bg-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="cursor-pointer rounded p-1 hover:bg-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {Number(item.price) * Number(item.quantity)} THB
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cursor-pointer rounded p-1 text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-semibold">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span className="font-semibold">{subtotal} THB</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping} THB</span>
                </div>
                <div className="flex justify-between">
                  {/* TODO: Implement Discount sync with stripe api */}
                  <span>Discount</span>
                  <span className="font-semibold text-green-600">
                    {discountPercentage} %
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">{total} THB</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                  placeholder="Promo code"
                />
                <button
                  onClick={handlePayment}
                  className={`w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white ${
                    cartItems.length === 0
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  }`}
                  disabled={cartItems.length === 0}
                >
                  Checkout →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
