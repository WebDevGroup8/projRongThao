import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { HomePage } from "./pages/HomePage";
import { DashBoard } from "./pages/DashBoard";
import ShoppingCart from "./pages/ShoppingCart";
import ItemDetail from "./pages/ItemDetail";
import { SeeAllItem } from "./pages/SeeAllItem";
import Test from "./components/Test";
import Payment from "./components/Payment";
import ViewOrder from "./pages/ViewOrder";
import { ProtectedCustomerRoute } from "./context/ProtectedCustomerRoute";
import { ProtectedAdminRoute } from "./context/ProtectedAdminRoute";
import useAuthStore from "./store";
import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import Loading from "./components/Loading";

function App() {
  const { autoLogin, jwt, isLoginPending, setIsLoginPending } = useAuthStore();
  useEffect(() => {
    const autoLoginHandler = async () => {
      setIsLoginPending(true);
      try {
        await autoLogin();
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoginPending(false);
      }
    };
    if (jwt) {
      autoLoginHandler();
    }
  }, []);

  return (
    !isLoginPending && (
      <div className="h-full w-full">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavigationBar />
                <HomePage />
              </>
            }
          />

          <Route path="/login" element={<SignIn />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <DashBoard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedCustomerRoute>
                <ItemDetail />
              </ProtectedCustomerRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedCustomerRoute>
                <ShoppingCart />
              </ProtectedCustomerRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedCustomerRoute>
                <ViewOrder />
              </ProtectedCustomerRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedCustomerRoute>
                <SeeAllItem />
              </ProtectedCustomerRoute>
            }
          />
          {/* TODO: remove this route and change to some order view with handle payment status */}
          <Route
            path="/payment"
            element={
              <ProtectedCustomerRoute>
                <Payment />
              </ProtectedCustomerRoute>
            }
          />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<>404</>} />
        </Routes>
      </div>
    )
  );
}

export default App;
