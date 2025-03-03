// useAuth.js
// This file will be not used anymore we migrate to use zustand as state control

import ax, { axData } from "../conf/ax";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import LoginSuccess from "@layout/LoginSuccess";
import ModalBase from "@components/layout/ModalBase";
import { conf, endpoint, path } from "@/conf/main";
import { useCookie } from "@/hooks/useCookie";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt, removeJwt] = useCookie(conf.userCookieName, null);
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
        const response = await ax.get(endpoint.auth.jwtUserWithRole);
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
        const response = await ax.post(endpoint.auth.login, {
          identifier: formData.identifier,
          password: formData.password,
        });

        const { jwt, user: userData } = response.data;

        updateJwt(jwt);

        const roleResponse = await ax.get(endpoint.auth.jwtUserWithRole);
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
        if (role === conf.role.customer) {
          navigate(path.public.home);
        } else if (role === conf.role.admin) {
          navigate(path.admin.dashboard);
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
    navigate(path.public.home);
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
