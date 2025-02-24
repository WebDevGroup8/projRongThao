import { X } from "lucide-react";

export default function LoginSuccess({ setIsOpen }) {
  return (
    <div className="relative mx-auto w-96 rounded-lg bg-white p-6 text-center shadow-xl">
      {/* Close button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Checkmark Icon */}
      <div className="mb-4 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-500"
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
      <p className="mt-1 text-gray-500">Login was successful.</p>
    </div>
  );
}
