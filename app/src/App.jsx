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
import { ProtectedCustomerRoute } from "./context/ProtectedCustomerRoute";
import { ProtectedAdminRoute } from "./context/ProtectedAdminRoute";

function App() {
  return (
    <div className="w-full h-full">
      <AuthProvider>
        <NavigationBar />
        <Routes>

          <Route
            path="/"
            element={
              <ProtectedCustomerRoute>
                <HomePage />
              </ProtectedCustomerRoute>
            } />

          <Route
            path="/login"
            element={
              <SignIn />
            } />

          <Route
            path="/customer/homepage"
            element={
              <ProtectedCustomerRoute>
                <HomePage />
              </ProtectedCustomerRoute>
            } />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <DashBoard />
              </ProtectedAdminRoute>
            } />

          <Route
            path="/customer/itemdetail"
            element={
              <ProtectedCustomerRoute>
                <ItemDetail />
              </ProtectedCustomerRoute>
            } />

          <Route
            path="/customer/cart"
            element={
              <ProtectedCustomerRoute>
                <ShoppingCart />
              </ProtectedCustomerRoute>
            } />

          <Route
            path="/customer/seeallitem"
            element={
              <ProtectedCustomerRoute>
                <SeeAllItem />
              </ProtectedCustomerRoute>
            } />
          {/* TODO: remove this route and change to some order view with handle payment status */}
          <Route
            path="/payment"
            element={
              <ProtectedCustomerRoute>
                <Payment />
              </ProtectedCustomerRoute>
            } />
          <Route
            path="/test"
            element={
              <ProtectedCustomerRoute>
                <Test />
              </ProtectedCustomerRoute>
            } />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
