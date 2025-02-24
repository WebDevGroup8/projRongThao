import "./App.css";

import { Route, Routes } from "react-router-dom";

import Admin from "@/components/admin/default/Admin";
import Container from "@layout/Container";
import Dashboard from "@admin/dashboard/Dashboard";
import Footer from "@layout/Footer";
import HomePage from "@public/home/HomePage";
import ItemDetail from "@public/detail/ItemDetail";
import ManageCategory from "@admin/category/ManageCategory";
import ManageProduct from "@admin/product/ManageProduct";
import NavigationBar from "@layout/NavigationBar";
import OrderManagement from "@admin/order/OrderManagement";
import Promotion from "@admin/promotion/Promotion";
import ProtectedAdminRoute from "@layout/ProtectedAdminRoute";
import ProtectedCustomerRoute from "@layout/ProtectedCustomerRoute";
import SeeAllItem from "@public/discovery/SeeAllItem";
import ShoppingCart from "@customer/cart/ShoppingCart";
import SignIn from "@public/login/SignIn";
import SignUp from "@public/register/SingupPage";
import { ToastContainer } from "react-toastify";
import ViewOrder from "@customer/order/ViewOrder";
import { path } from "@/conf/main.js";
import useAuthStore from "@/store/store";
import { useEffect } from "react";

// Public Routes

// Customer Routes

// Admin Routes

// Layout Components

function App() {
  const { autoLogin, jwt, isLoginPending, setIsLoginPending } = useAuthStore();
  const autoLoginHandler = async () => {
    setIsLoginPending(true);
    try {
      await autoLogin();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoginPending(false);
    }
  };
  useEffect(() => {
    if (jwt) {
      autoLoginHandler();
    } else {
      setIsLoginPending(false);
    }
  }, []);

  return (
    !isLoginPending && (
      <div className="h-full w-full">
        <ToastContainer />
        <Routes>
          {/* Public Route */}
          <Route
            path="/"
            element={
              <>
                <NavigationBar />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route path={path.public.login} element={<SignIn />} />
          <Route path={path.public.register} element={<SignUp />} />
          <Route
            path={path.public.discovery}
            element={
              <>
                <NavigationBar />
                <Container>
                  <SeeAllItem />
                </Container>
                <Footer />
              </>
            }
          />

          <Route
            path={`${path.public.detail}/:id`}
            element={
              <>
                <NavigationBar />
                <Container>
                  <ItemDetail />
                </Container>
                <Footer />
              </>
            }
          />

          {/* Customer Route */}
          <Route
            path={path.customer.cart}
            element={
              <ProtectedCustomerRoute>
                <ShoppingCart />
              </ProtectedCustomerRoute>
            }
          />
          <Route
            path={path.customer.order}
            element={
              <ProtectedCustomerRoute>
                <ViewOrder />
              </ProtectedCustomerRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path={path.admin.defualt}
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path={path.admin.dashboard}
            element={
              <ProtectedAdminRoute>
                <Dashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path={path.admin.order}
            element={
              <ProtectedAdminRoute>
                <OrderManagement />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path={path.admin.product}
            element={
              <ProtectedAdminRoute>
                <ManageProduct />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path={path.admin.category}
            element={
              <ProtectedAdminRoute>
                <ManageCategory />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path={path.admin.promotion}
            element={
              <ProtectedAdminRoute>
                <Promotion />
              </ProtectedAdminRoute>
            }
          />

          {/* Otherwise route */}
          <Route
            path={path.otherwise}
            element={
              <a className="hover:underline" href="/">
                Go Back
              </a>
            }
          />
        </Routes>
      </div>
    )
  );
}

export default App;
