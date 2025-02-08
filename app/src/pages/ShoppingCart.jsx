import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ax from "../conf/ax";
export default function ShoppingCart() {
  // TODOs: Implement fetch data from strapi
  const [cartItems, setCartItems] = useState([
    {
      id: 11,
      documentId: "a6iod8iq8pmrhjypke155a4p",
      name: "Chuck 70 De Luxe Heel Platform",
      description: null,
      price: 3999,
      quantity: 1,
      size: "44 EU",
      image:
        "https://i5.walmartimages.com/seo/Fashion-Running-Sneaker-for-Men-Shoes-Casual-Shoes-Leather-Sport-Shoes-Breathable-Comfortable-Walking-Shoes-Black-US11_8e9d44bb-b19b-42e9-bca1-979205c0779e.6fc41a815c10699375294302df46565a.jpeg",
    },
    {
      id: 19,
      documentId: "qyqbcu9jkbun0xbq8kec9d9j",
      name: "Run Star Motion Canvas Platform",
      description: null,
      price: 3700,
      quantity: 1,
      size: "44 EU",
      image:
        "https://images-cdn.ubuy.co.in/633b4d0ec453a05ef838979c-damyuan-running-shoes-men-fashion.jpg",
    },
    {
      id: 21,
      documentId: "s1k8lmqogh8g5zobsxmkk7fu",
      name: "Run Star Legacy CX",
      description: null,
      price: 3000,
      quantity: 1,
      size: "44 EU",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpxtLxkCfAqfViZreiFtnJFI3fkFijiFoH9Q&s",
    },
    {
      id: 25,
      documentId: "lxd7nd90kd0ri9q46zvpy1lu",
      name: "Converse Weapon Leather Lux Pack",
      description: null,
      price: 2600,
      quantity: 1,
      size: "44 EU",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw_2iwaya08RkTGTBypU1FNnk8Z9PVjq413nLkPtCrYDo50vCvh-vhopfOQ80MU9dboNY&usqp=CAU",
    },
    {
      id: 27,
      documentId: "fea8vg5ufn3b6zeg081dqe0c",
      name: "Converse Cruise",
      description: null,
      price: 3100,
      quantity: 1,
      size: "44 EU",
      image: "https://m.media-amazon.com/images/I/71Li53y47aL._AC_UY1000_.jpg",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let shipping = 0;
  let discountPercentage = 0;
  let discount = 0;
  let total = subtotal;

  if (cartItems.length !== 0) {
    shipping = 150;
    discountPercentage = 10;
    discount = subtotal * (discountPercentage / 100);
    total = subtotal + shipping - discount;
  }

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-8">
          🛒 Your Shopping Cart
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-xl font-semibold text-gray-600">
                  Your cart is empty
                </p>
                <p className="text-gray-500 mt-2">
                  Add some items to get started!
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col sm:flex-row items-center border border-gray-100"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0"
                  />
                  <div className="flex-1 ml-0 sm:ml-4 text-center sm:text-left">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center space-x-15 mt-4 sm:mt-0 ">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-200 rounded"
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
                        className="p-1 hover:bg-gray-200 rounded"
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
                        {item.price * item.quantity} THB
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-red-400 hover:bg-red-500 hover:text-white transition rounded"
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
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Summary</h3>
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
                  <span>Discount</span>
                  <span className="font-semibold text-green-600">
                    {discountPercentage} %
                  </span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">{total} THB</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Promo code"
                />
                <button
                  onClick={handlePayment}
                  className={`w-full px-4 py-2 bg-blue-500 border border-transparent rounded-md text-sm font-medium text-white ${
                    cartItems.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
