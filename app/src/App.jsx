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
import ViewOrder from "./pages/ViewOrder";
import { ProtectedCustomerRoute } from "./context/ProtectedCustomerRoute";
import { ProtectedAdminRoute } from "./context/ProtectedAdminRoute";

function App() {
  return (
    <div className="h-full w-full">
      <AuthProvider>
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
            path="/customer/cart"
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
          <Route
            path="/test"
            element={
              <ProtectedCustomerRoute>
                <Test />
              </ProtectedCustomerRoute>
            }
          />
          <Route path="*" element={<>404</>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
