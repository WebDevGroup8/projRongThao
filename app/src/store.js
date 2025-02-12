import { create } from "zustand";
import Cookies from "js-cookie";
import conf from "./conf/mainapi";
import ax, { axData } from "./conf/ax";

const useAuthStore = create((set) => ({
  jwt: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  user: null,
  showModal: false,
  isLoginPending: true,
  errMsg: null,

  setJwt: (jwt, options = {}) => {
    Cookies.set("user", JSON.stringify(jwt), options);
    set({ jwt });
  },
  removeJwt: () => {
    Cookies.remove("user");
    set({ jwt: null });
  },
  setUser: (user) => set({ user }),
  setShowModal: (showModal) => set({ showModal }),
  setIsLoginPending: (isLoginPending) => set({ isLoginPending }),
  setErrMsg: (errMsg) => set({ errMsg }),

  updateJwt: (jwt) => {
    set((state) => {
      if (state.jwt !== jwt) {
        console.log("Updating JWT:", jwt);
        axData.jwt = jwt;
        return { jwt };
      }
      return state; // No state update if JWT is the same
    });
  },

  autoLogin: async () => {
    set({ isLoginPending: true });
    try {
      const jwt = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
      if (jwt) {
        axData.jwt = jwt;
        const response = await ax.get(conf.jwtRoleEndpoint);
        const userData = response.data;
        set({ user: { ...userData, role: userData.role.name } });
      }
    } catch (error) {
      console.error("Login failed:", error.message || "An error occurred");
    } finally {
      set({ isLoginPending: false });
    }
  },

  login: async (formData, navigate) => {
    try {
      const response = await ax.post(conf.loginEndpoint, {
        identifier: formData.identifier,
        password: formData.password,
      });

      const { jwt, user: userData } = response.data;

      Cookies.set("user", JSON.stringify(jwt), { path: "/" });
      useAuthStore.getState().updateJwt(jwt); // Use the store's method to update state
      axData.jwt = jwt; // Assign to Axios global config

      const roleResponse = await ax.get(conf.jwtRoleEndpoint);
      const role = roleResponse.data.role.name;

      const cookieOptions = formData.rememberMe
        ? {
            path: "/",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          }
        : { path: "/" };

      set({ jwt });
      Cookies.set("user", JSON.stringify(jwt), cookieOptions);
      set({ user: { ...userData, role }, showModal: true, errMsg: null });

      if (role === "customer")
        navigate("/customer/homepage", { replace: true });
      else if (role === "admin")
        navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
      set({
        errMsg:
          error.status === 400
            ? "Login failed: username or password is incorrect"
            : "Login failed: An error occurred",
      });
    }
  },

  logout: (navigate) => {
    Cookies.remove("user");
    set({ user: null, jwt: null });
    navigate("/", { replace: true });
  },
}));

export default useAuthStore;
