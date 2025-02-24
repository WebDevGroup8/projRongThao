import Container from "@layout/Container";
import Footer from "@layout/Footer";
import Loading from "@layout/Loading";
import NavigationBar from "@layout/NavigationBar";
import ScrollToTop from "@layout/ScrollToTop";
import useAuthStore from "@/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { path } from "@/conf/main";

export default function ProtectedCustomerRoute({ children }) {
  const { isLoginPending, user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoginPending && !user) {
      navigate(path.public.login);
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
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}
