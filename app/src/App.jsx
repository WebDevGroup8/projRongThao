import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { HomePage } from "./pages/HomePage";
import DashBoard from "./pages/DashBoard";
import ShoppingCart from "./pages/ShoppingCart";
import ItemDetail from "./pages/ItemDetail";
import { SeeAllItem } from "./pages/SeeAllItem";
import Test from "./components/Test";
import Payment from "./components/Payment";
import ViewOrder from "./pages/ViewOrder";
import { ProtectedCustomerRoute } from "./context/ProtectedCustomerRoute";
import { ProtectedAdminRoute } from "./context/ProtectedAdminRoute";
import useAuthStore from "./store";
import { useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Container from "./components/Container";
import Footer from "./components/Footer";
import ManageProduct from "./pages/ManageProduct";
import OrderManagement from "./pages/OrderManagement";

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
    } else {
      setIsLoginPending(false);
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
          <Route path="/login" element={<SignIn />} />

          <Route path="/admin/DashBoard" element={<DashBoard />} />

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
          <Route
            path="*"
            element={
              <a className="hover:underline" href="/">
                Go Back
              </a>
            }
          />

          <Route
            path="/admin/manageproduct"
            element={
              <ProtectedAdminRoute>
                <ManageProduct />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedAdminRoute>
                <OrderManagement />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>
    )
  );
}

export default App;
