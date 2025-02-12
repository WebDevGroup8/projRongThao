// useAuth.js
// This file will be not used anymore we migrate to use zustand as state control
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { useCookie } from "./useCookie";
import conf from "../conf/mainapi";
import ax, { axData } from "../conf/ax";
import ModalBase from "../components/ModalBase";
import LoginSuccess from "../components/LoginSuccess";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt, removeJwt] = useCookie("user", null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoginPending, setIsLoginPending] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const updateJwt = useCallback(
    (jwt) => {
      axData.jwt = jwt;
      if (!jwt) {
        removeJwt();
      }
    },
    [removeJwt],
  );

  const autoLogin = useCallback(async () => {
    try {
      setIsLoginPending(true);
      if (jwt) {
        updateJwt(jwt.jwt);
        const response = await ax.get(conf.jwtRoleEndpoint);
        const userData = response.data;
        const role = userData.role.name;
        setUser({ ...userData, role: role });
      }
    } catch (error) {
      console.error("Login failed:", error.message || "An error occurred");
    } finally {
      setIsLoginPending(false);
    }
  }, [jwt, updateJwt]);

  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line
  }, []);

  const login = useCallback(
    async (formData) => {
      try {
        const response = await ax.post(conf.loginEndpoint, {
          identifier: formData.identifier,
          password: formData.password,
        });

        const { jwt, user: userData } = response.data;

        updateJwt(jwt);

        const roleResponse = await ax.get(conf.jwtRoleEndpoint);
        const role = roleResponse.data.role.name;
        console.log(roleResponse);

        const cookieOptions = formData.rememberMe
          ? {
              path: "/",
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            } // Persistent cookie (30 days)
          : { path: "/" }; // Session cookie

        setJwt({ jwt }, cookieOptions, formData.rememberMe);
        setUser({ ...userData, role });
        setShowModal(true);
        if (role === "customer") {
          navigate("/customer/homepage", { replace: true });
        } else if (role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        }
        setErrMsg(null);
      } catch (error) {
        console.log(error.status);
        if (error.status === 400) {
          console.error("Login failed:", "username or password is incorrect");
          setErrMsg("Login failed: username or password is incorrect");
        } else {
          console.error("Login failed:", error.message || "An error occurred");
          setErrMsg("Login failed: An error occurred");
        }
      }
    },
    [navigate, setUser, setJwt, updateJwt],
  );

  const logout = useCallback(() => {
    removeJwt();
    setUser();
    navigate("/", { replace: true });
  }, [navigate, removeJwt]);

  const contextValue = useMemo(
    () => ({
      errMsg,
      isLoginPending,
      user,
      login,
      logout,
    }),
    [errMsg, isLoginPending, user, login, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <div>{children}</div>
      <ModalBase
        isOpen={showModal}
        setIsOpen={setShowModal}
        countDown={() => setTimeout(() => setShowModal(false), 2500)}
      >
        <LoginSuccess setIsOpen={setShowModal} />
      </ModalBase>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
