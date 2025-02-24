import React from "react";
import { Mail, ShoppingCart, Search, Package, Info } from "lucide-react";

export default function Helps() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-xl bg-gray-50 p-6">
      <h1 className="text-center text-3xl font-bold text-gray-800">
        Help & Information
      </h1>

      <section className="rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow-md">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-600">
          <Search /> How to Search for Products
        </h2>
        <p className="text-gray-700">
          Use the large <strong>Search</strong> button to find products across
          the entire store. You can also use filters to refine your search based
          on categories, price, and more.
        </p>
      </section>

      <section className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow-md">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-green-600">
          <ShoppingCart /> Shopping Cart
        </h2>
        <p className="text-gray-700">
          Click on the <strong>Cart</strong> button to view the items you have
          added. You can review and modify your order before proceeding to
          checkout.
        </p>
      </section>

      <section className="rounded-lg border-l-4 border-yellow-500 bg-white p-4 shadow-md">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-yellow-600">
          <Package /> Order History & Status
        </h2>
        <p className="text-gray-700">
          In the <strong>View Orders</strong> page, you can track your past
          orders and their current status:
        </p>
        <ul className="ml-6 list-disc text-gray-700">
          <li>
            <strong>Pending</strong> - Your payment is being processed.
          </li>
          <li>
            <strong>Abandoned</strong> - The payment was not completed.
          </li>
          <li>
            <strong>Paid</strong> - Payment has been received.
          </li>
          <li>
            <strong>Shipped</strong> - Your order is on the way.
          </li>
          <li>
            <strong>Completed</strong> - Your order has been delivered.
          </li>
          <li>
            <strong>Canceled</strong> - The order was canceled.
          </li>
        </ul>
      </section>

      <section className="rounded-lg border-l-4 border-purple-500 bg-white p-4 shadow-md">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-purple-600">
          <Info /> Shoe Size Guide
        </h2>
        <p className="text-gray-700">
          If you need help selecting the right size, visit our{" "}
          <a className="text-purple-500 hover:underline" href="/size">
            Size Guide
          </a>{" "}
          page to find measurements and fitting tips.
        </p>
      </section>

      <section className="rounded-lg border-l-4 border-red-500 bg-white p-4 shadow-md">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-red-600">
          <Info /> Shipping & Returns
        </h2>
        <p className="text-gray-700">
          For details on delivery times, shipping costs, and our return policy,
          check out our{" "}
          <a className="text-red-500 hover:underline" href="/shipping">
            Shipping & Return
          </a>{" "}
          page.
        </p>
      </section>

      <section className="rounded-lg border-l-4 border-indigo-500 bg-white p-4 shadow-md">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-indigo-600">
          <Mail /> Payment Information
        </h2>
        <p className="text-gray-700">
          Please enter your <strong>email</strong> as the store will send
          payment details via email. Additionally, ensure your{" "}
          <strong>address</strong> is correct for invoice or shipping purposes.
        </p>
        <p className="text-gray-700">
          The payment system may take <strong>1-5 minutes</strong> to process.
          Please wait. If the confirmation is delayed beyond this period,
          contact our <strong>support team</strong>.
        </p>
      </section>
    </div>
  );
}
