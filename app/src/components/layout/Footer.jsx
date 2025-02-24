import { Github, HelpCircle, Mail, Ruler, Truck } from "lucide-react";

import React from "react";

function Footer() {
  return (
    <div className="bg-primary mt-20 flex flex-col items-center px-4 py-8 text-gray-300 md:px-12 lg:w-full">
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:max-w-screen-xl lg:grid-cols-3">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">About Us</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            "RongThao – Your ultimate destination for premium footwear. We offer
            high-quality shoes at unbeatable prices, combining comfort,
            durability, and style to support every step of your journey—whether
            for sports, casual wear, or special occasions."
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">
            Customer Service
          </h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
              <Mail className="h-5 w-5 text-blue-400" />
              Contact Us
            </li>
            <li className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
              <Truck className="h-5 w-5 text-green-400" />
              Shipping & Returns
            </li>
            <li className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
              <Ruler className="h-5 w-5 text-yellow-400" />
              Size Guide
            </li>
            <li className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
              <HelpCircle className="h-5 w-5 text-red-400" />
              FAQs
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Follow Us</h2>
          <div className="flex space-x-4 text-sm">
            <a
              href="https://github.com/WebDevGroup8/projRongThao"
              className="flex items-center gap-3 text-gray-400 transition-all duration-300 hover:scale-105 hover:text-white"
            >
              <Github className="h-6 w-6 text-white" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
        <p>© 2025 RongThao Store. All rights reserved.</p>
        <p className="text-gray-500 italic transition-colors duration-300 hover:text-gray-300">
          Powered by Tailwind, Git, and countless late-night debugging sessions.
        </p>
      </div>
    </div>
  );
}

export default Footer;
