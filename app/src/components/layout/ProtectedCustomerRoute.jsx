import Container from "@layout/Container";
import Footer from "@layout/Footer";
import Loading from "@layout/Loading";
import NavigationBar from "@layout/NavigationBar";
import ScrollToTop from "@layout/ScrollToTop";
import useAuthStore from "@/store/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { conf, path } from "@/conf/main";
import SupportChat from "@layout/SupportChat";

export default function ProtectedCustomerRoute() {
  const { isLoginPending, user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoginPending && !user) {
      navigate(path.public.login);
    }
  }, [user, navigate, isLoginPending]);
  if (!user || user.role !== conf.role.customer) {
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
      <Container>
        <Outlet />
      </Container>
      <SupportChat />
      <Footer />
    </div>
  );
}
