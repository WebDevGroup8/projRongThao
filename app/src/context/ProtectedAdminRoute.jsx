import { useNavigate } from "react-router";
import { useEffect } from "react";
import Loading from "../components/Loading";
import useAuthStore from "../store";
import AdminSidebar from "../components/AdminSidebar";

export const ProtectedAdminRoute = ({ children }) => {
  const { isLoginPending, user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoginPending && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, isLoginPending]);
  if (!user || user.role !== "admin") {
    return isLoginPending ? (
      <Loading />
    ) : (
      <>
        <div className="container mt-20 text-center">
          <p className="mb-5 text-4xl font-bold">You must Login as Admin!</p>
          <a href="/" className="text-xl underline">
            Go Back
          </a>
        </div>
      </>
    );
  }
  return (
    <div className="flex w-full flex-row">
      {/* Admin Sidebar */}
      <AdminSidebar />
      {/* Content */}
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        {children}
      </div>
    </div>
  );
};
