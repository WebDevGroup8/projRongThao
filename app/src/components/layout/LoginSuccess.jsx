import { X } from "lucide-react";

export default function LoginSuccess({ setIsOpen }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-96 text-center relative mx-auto">
      {/* Close button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Checkmark Icon */}
      <div className="flex justify-center items-center mb-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
      </div>

      {/* Text */}
      <h2 className="text-xl font-semibold text-gray-800">Welcome Back!</h2>
      <p className="text-gray-500 mt-1">Login was successful.</p>
    </div>
  );
}
