import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavBar";

export const ProtectedCustomerRoute = ({ children }) => {
  const { isLoginPending, user } = useAuth();
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
        <div className="container mt-20 text-center ">
          <p className="text-4xl font-bold mb-5">You must Login as Customer!</p>
          <a href="/admin/dashboard" className=" text-xl underline">
            Go Back
          </a>
        </div>
      </>
    );
  }
  return (
    <div>
      <NavigationBar />
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        {children}
      </div>
    </div>
  );
};
