import { useNavigate } from "react-router";
import { useEffect } from "react";
import Loading from "./Loading";
import useAuthStore from "../../store/store";
import AdminSidebar from "../components/AdminSidebar";

export default function ProtectedAdminRoute({ children }) {
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
        <div className="mt-20 w-full text-center">
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
      <div className="w-[250px]">
        <AdminSidebar />
      </div>
      {/* Content */}
      <div className="w-full">{children}</div>
    </div>
  );
}
