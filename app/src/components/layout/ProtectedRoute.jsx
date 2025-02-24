import { useEffect } from "react";
import { useNavigate } from "react-router";
import { path } from "@/conf/main";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(path.public.login);
    }
  }, [user, navigate]);
  if (!user) {
    return (
      <>
        <div className="container"></div>
      </>
    );
  }
  return children;
};
