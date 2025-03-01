import AdminSidebar from "@layout/AdminSidebar";
import Loading from "@layout/Loading";
import useAuthStore from "@/store/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { conf, path } from "@/conf/main";

export default function ProtectedAdminRoute() {
  const { isLoginPending, user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoginPending && !user) {
      navigate(path.public.login);
    }
  }, [user, navigate, isLoginPending]);
  if (!user || user.role !== conf.role.admin) {
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
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
