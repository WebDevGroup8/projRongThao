import { useNavigate } from "react-router";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import Container from "../components/Container";
import NavigationBar from "../components/NavigationBar";
import useAuthStore from "../store";
import ScrollToTop from "../components/ScrollToTop";

export const ProtectedCustomerRoute = ({ children }) => {
  const { isLoginPending, user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoginPending && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, isLoginPending]);
  if (!user || user.role !== "customer") {
    return isLoginPending ? (
      <Loading />
    ) : (
      <>
        <div className="container mt-20 text-center">
          <p className="mb-5 text-4xl font-bold">You must Login as Customer!</p>
          <a href="/admin/dashboard" className="text-xl underline">
            Go Back
          </a>
        </div>
      </>
    );
  }
  return (
    <div>
      <ScrollToTop />
      <NavigationBar />
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
};
