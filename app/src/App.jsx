import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { DashBoard } from "./pages/DashBoard";
import ShoppingCart from "./pages/shoppingCart";
import NavigationBar from "./components/NavBar";

function App() {
  return (
    <div className="w-full h-full">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<SignIn />} />

        <Route path="/login" element={<SignIn />} />

        <Route path="/customer/homepage" element={<HomePage />} />

        <Route path="/admin/dashboard" element={<DashBoard />} />

        <Route path="/customer/Cart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

export default App;
