import { useNavigate } from "react-router";
import { useEffect } from "react";

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
