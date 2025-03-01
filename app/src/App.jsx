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
import PublicRoute from "@layout/PublicRoute";
import SimpleRoute from "@layout/SimpleRoute";
import Otherwise from "@layout/Otherwise";

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
          {/* Authentication Route */}
          <Route path={path.public.login} element={<SignIn />} />
          <Route path={path.public.register} element={<SignUp />} />

          {/* Public Route */}
          <Route element={<SimpleRoute />}>
            <Route path={path.public.home} element={<HomePage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path={path.public.discovery} element={<SeeAllItem />} />
            <Route path={path.public.detailRoute} element={<ItemDetail />} />
            <Route path={path.public.size} element={<SizeGuide />} />
            <Route path={path.public.helps} element={<Helps />} />
            <Route path={path.public.shipping} element={<ShippingReturn />} />
          </Route>

          {/* Customer Route */}
          <Route element={<ProtectedCustomerRoute />}>
            <Route path={path.customer.cart} element={<ShoppingCart />} />
            <Route path={path.customer.order} element={<ViewOrder />} />
          </Route>

          {/* Admin Route */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path={path.admin.default} element={<Admin />} />
            <Route path={path.admin.dashboard} element={<Dashboard />} />
            <Route path={path.admin.order} element={<OrderManagement />} />
            <Route path={path.admin.product} element={<ManageProduct />} />
            <Route path={path.admin.category} element={<ManageCategory />} />
            <Route path={path.admin.promotion} element={<Promotion />} />
            <Route path={path.admin.review} element={<ReviewManage />} />
            <Route path={path.admin.chat} element={<ChatWithCustomer />} />
          </Route>

          {/* Otherwise route */}
          <Route path={path.otherwise} element={<Otherwise />} />
        </Routes>
      </div>
    )
  );
}

export default App;
