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
import SignUp from "@public/register/Singup";
import SizeGuide from "@public/misc/SizeGuide";
import Helps from "@public/misc/Helps";
import ShippingReturn from "@public/misc/ShippingReturn";

// Customer Routes
import ShoppingCart from "@customer/cart/ShoppingCart";
import ViewOrder from "@customer/order/ViewOrder";

// Admin Routes
import Admin from "@admin/default/Admin";
import Dashboard from "@admin/dashboard/Dashboard";
import OrderManagement from "@admin/order/OrderManagement";
import ManageProduct from "@admin/product/ManageProduct";
import ManageCategory from "@admin/category/ManageCategory";
import Promotion from "@admin/promotion/Promotion";
import ReviewManage from "@admin/review/ReviewManage";
import ChatWithCustomer from "@admin/chat/ChatWithCustomer";

// Layout Components
import ProtectedCustomerRoute from "@layout/ProtectedCustomerRoute";
import ProtectedAdminRoute from "@layout/ProtectedAdminRoute";
import NavigationBar from "@layout/NavigationBar";
import Container from "@layout/Container";
import Footer from "@layout/Footer";
import ScrollToTop from "@layout/ScrollToTop";
import SupportChat from "./components/layout/SupportChat";

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
        <ToastContainer className="z-0" />
        <Routes>
          {/* Public Route */}
          <Route
            path="/"
            element={
              <>
                <ScrollToTop />
                <NavigationBar />
                <HomePage />
                <SupportChat />
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
                <ScrollToTop />
                <NavigationBar />
                <Container>
                  <SeeAllItem />
                  <SupportChat />
                </Container>
                <Footer />
              </>
            }
          />

          <Route
            path={`${path.public.detail}/:id`}
            element={
              <div className="z-50">
                <ScrollToTop />
                <NavigationBar />
                <Container>
                  <ItemDetail />
                  <SupportChat />
                </Container>
                <Footer />
              </div>
            }
          />

          <Route
            path={path.public.size}
            element={
              <>
                <ScrollToTop />
                <NavigationBar />
                <Container>
                  <SizeGuide />
                  <SupportChat />
                </Container>
                <Footer />
              </>
            }
          />

          <Route
            path={path.public.helps}
            element={
              <>
                <ScrollToTop />
                <NavigationBar />
                <Container>
                  <Helps />
                  <SupportChat />
                </Container>
                <Footer />
              </>
            }
          />

          <Route
            path={path.public.shipping}
            element={
              <>
                <ScrollToTop />
                <NavigationBar />
                <Container>
                  <ShippingReturn />
                  <SupportChat />
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
            path={path.admin.default}
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

          <Route
            path={path.admin.review}
            element={
              <ProtectedAdminRoute>
                <ReviewManage />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path={path.admin.chat}
            element={
              <ProtectedAdminRoute>
                <ChatWithCustomer />
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
