import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { DashBoard } from "./pages/DashBoard";
import ShoppingCart from "./pages/ShoppingCart";
import NavigationBar from "./components/NavBar";
import { AuthProvider } from "./context/useAuth";
import Test from "./components/Test";

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

          <Route path="/customer/cart" element={<ShoppingCart />} />

          <Route path="/test" element={<Test />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
