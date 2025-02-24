import { useEffect } from "react";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
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
