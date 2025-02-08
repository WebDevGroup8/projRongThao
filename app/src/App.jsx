import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { DashBoard } from "./pages/DashBoard";
import ShoppingCart from "./pages/shoppingCart";
import NavigationBar from "./components/NavBar";
import ItemDetail from "./pages/ItemDetail";

function App() {
  return (
    <div className="w-full h-full">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/customer/homepage" element={<HomePage />} />

        <Route path="/admin/dashboard" element={<DashBoard />} />

        <Route path="/customer/Cart" element={<ShoppingCart />} />

        <Route path="/customer/itemdetail" element={<ItemDetail/>}/>

      </Routes>
    </div>
  );
}

export default App;
