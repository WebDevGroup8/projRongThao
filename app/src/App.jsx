import "./App.css";
import { path } from "@/conf/main.js";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuthStore from "@/store/store";
import { useEffect } from "react";

// Public Routes
import HomePage from "@public/home/HomePage";
import SeeAllItem from "@public/discovery/SeeAllItem";
import ItemDetail from "@public/detail/ItemDetail";
import SignIn from "@public/login/SignIn";
import SignUp from "@public/register/SingupPage";

// Customer Routes
import ShoppingCart from "@customer/cart/ShoppingCart";
import ViewOrder from "@customer/order/ViewOrder";

// Admin Routes
import Admin from "@/admin/Admin";
import Dashboard from "@admin/dashboard/Dashboard";
import OrderManagement from "@admin/order/OrderManagement";
import ManageProduct from "@admin/product/ManageProduct";
import ManageCategory from "@admin/category/ManageCategory";
import Promotion from "@admin/promotion/Promotion";

// Layout Components
import ProtectedCustomerRoute from "@layout/ProtectedCustomerRoute";
import ProtectedAdminRoute from "@layout/ProtectedAdminRoute";
import NavigationBar from "@layout/NavigationBar";
import Container from "@layout/Container";
import Footer from "@layout/Footer";

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
