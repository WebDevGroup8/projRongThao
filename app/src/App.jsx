import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { DashBoard } from "./pages/DashBoard";
import ShoppingCart from "./pages/ShoppingCart";
import NavigationBar from "./components/NavBar";
import ItemDetail from "./pages/ItemDetail";
import { AuthProvider } from "./context/useAuth";
import { SeeAllItem } from "./pages/SeeAllItem";
import Test from "./components/Test";
import Payment from "./components/Payment";

function App() {
  return (
    <div className="w-full h-full">
      <AuthProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/login" element={<SignIn />} />

          <Route path="/customer/homepage" element={<HomePage />} />

          <Route path="/admin/dashboard" element={<DashBoard />} />

          <Route path="/customer/itemdetail" element={<ItemDetail />} />

          <Route path="/customer/cart" element={<ShoppingCart />} />

          <Route path="/customer/seeallitem" element={<SeeAllItem />} />
          {/* TODO: remove this route and change to some order view with handle payment status */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
