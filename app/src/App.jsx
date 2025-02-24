import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./components/public/login/SignIn";
import { HomePage } from "./components/public/home/HomePage";
import Dashboard from "@/components/admin/dashboard/Dashboard.jsx";
import ShoppingCart from "./pages/ShoppingCart";
import ItemDetail from "./pages/ItemDetail";
import { SeeAllItem } from "./components/public/discovery/SeeAllItem";
import Test from "./components/Test";
import ViewOrder from "./components/customer/order/ViewOrder";
import { ProtectedCustomerRoute } from "./context/ProtectedCustomerRoute";
import { ProtectedAdminRoute } from "./components/layout/ProtectedAdminRoute";
import useAuthStore from "./store/store";
import { useEffect } from "react";
import NavigationBar from "./components/layout/NavigationBar";
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import ManageProduct from "./components/admin/product/ManageProduct";
import ManageCategory from "./components/admin/category/ManageCategory";
import OrderManagement from "./components/admin/order/OrderManagement";
import SignUp from "./components/public/register/SingupPage";
import Promotion from "./components/admin/Promotion";
import Admin from "./components/admin/Admin";
import { ToastContainer } from "react-toastify";

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
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
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
          <Route
            path="/products"
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

          {/* Customer Route */}
          <Route
            path="/product/:id"
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

          <Route path="/test" element={<Test />} />
          <Route
            path="*"
            element={
              <a className="hover:underline" href="/">
                Go Back
              </a>
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <Dashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/product"
            element={
              <ProtectedAdminRoute>
                <ManageProduct />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/category"
            element={
              <ProtectedAdminRoute>
                <ManageCategory />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/order"
            element={
              <ProtectedAdminRoute>
                <OrderManagement />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/promotion"
            element={
              <ProtectedAdminRoute>
                <Promotion />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>
    )
  );
}

export default App;
