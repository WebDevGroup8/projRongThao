// Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "../context/useAuth";

export const LoginPage = () => (
    <div className="flex flex-col">
        <h1>This is the Login Page</h1>
        <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Green
        </button>
    </div>
);