import React from "react";
import { Truck, RefreshCw, Info } from "lucide-react";

export default function ShippingReturn() {
  return (
    <div className="mx-auto max-w-4xl rounded-lg border p-10 text-gray-700 shadow-lg">
      <h1 className="mb-6 flex items-center justify-center gap-2 text-center text-3xl font-bold">
        <Truck className="text-blue-500" /> Shipping & Return
      </h1>

      <section className="mb-8 rounded-lg border p-4">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
          <Truck className="text-green-500" /> Shipping Options
        </h2>
        <p>We offer a simple and reliable shipping option for all orders:</p>
        <ul className="mt-2 list-inside list-disc pl-4">
          <li>
            <strong>Standard Shipping:</strong> ฿150 per order (no quantity or
            location restrictions)
          </li>
          <li>
            <strong>Estimated delivery time:</strong> 3-5 business days
          </li>
        </ul>
        <p className="mt-2">
          Once your order is placed, you will receive a confirmation email with
          tracking details.
        </p>
      </section>

      <section className="mb-8 rounded-lg border p-4">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
          <Info className="text-yellow-500" /> Additional Shipping Information
        </h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            Orders are processed Monday to Friday, excluding public holidays.
          </li>
          <li>
            Processing and delivery times may be longer during peak seasons or
            holidays.
          </li>
          <li>
            We do not ship to P.O. boxes, freight forwarders, or package
            forwarding services.
          </li>
          <li>International shipping is not available.</li>
        </ul>
      </section>

      <section className="mb-8 rounded-lg border p-4">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
          <RefreshCw className="text-red-500" /> Return Policy
        </h2>
        <p>
          We want you to shop with confidence! If you're not completely
          satisfied, you can return your items within 30 days under the
          following conditions:
        </p>
        <ul className="mt-2 list-inside list-disc pl-4">
          <li>Items must be unused, unwashed, and in original condition.</li>
          <li>All tags, packaging, and accessories must be included.</li>
          <li>
            Shipping fees are non-refundable, except in cases of incorrect or
            defective items.
          </li>
        </ul>
      </section>

      <div className="borderp-4 mt-6 rounded-lg text-center text-gray-600">
        <p>
          And don’t forget, we’re always here for you! Feel free to{" "}
          <a
            href="https://github.com/WebDevGroup8/projRongThao"
            className="text-blue-500"
          >
            contact us
          </a>{" "}
          anytime.
        </p>
        <p className="mt-2 font-semibold">
          So go ahead—shop with confidence! 😊👟✨
        </p>
      </div>
    </div>
  );
}
