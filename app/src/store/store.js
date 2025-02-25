import ax, { axData } from "../conf/ax";

import Cookies from "js-cookie";
import { conf, endpoint, path } from "@/conf/main";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  jwt: Cookies.get(conf.userCookieName)
    ? JSON.parse(Cookies.get(conf.userCookieName))
    : null,
  user: null,
  cart: [],
  showModal: false,
  isLoginPending: true,
  errMsg: null,

  setJwt: (jwt, options = {}) => {
    Cookies.set(conf.userCookieName, JSON.stringify(jwt), options);
    set({ jwt });
  },
  removeJwt: () => {
    Cookies.remove(conf.userCookieName);
    set({ jwt: null });
  },

  setUser: (user) => set({ user }),
  setShowModal: (showModal) => set({ showModal }),
  setIsLoginPending: (isLoginPending) => set({ isLoginPending }),
  setErrMsg: (errMsg) => set({ errMsg }),

  setCart: (newCart) => set({ cart: newCart }),

  addToCart: async (product) => {
    set((state) => {
      const existingCart = state.cart || [];
      const existingItem = existingCart.find(
        (item) =>
          item.id === product.id && item.sizeIndex === product.sizeIndex,
      );

      let updatedCart;

      if (existingItem) {
        // If product already in cart, update its quantity
        updatedCart = existingCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // If product is not in the cart, add it with quantity 1
        updatedCart = [...existingCart, { ...product, quantity: 1 }];
      }
      return { cart: updatedCart };
    });
    try {
      await ax.put(
        endpoint.customer.cart.update(useAuthStore.getState().user.id),
        {
          cart: useAuthStore.getState().cart,
        },
      );
    } catch (e) {
      console.log(e);
    }
  },

  removeFromCart: async (productId, productSizeIndex) => {
    set((state) => ({
      cart: state.cart.filter(
        (item) => item.id !== productId || item.sizeIndex !== productSizeIndex,
      ),
    }));
    try {
      await ax.put(
        endpoint.customer.cart.update(useAuthStore.getState().user.id),
        {
          cart: useAuthStore.getState().cart,
        },
      );
    } catch (e) {
      console.log(e);
    }
  },

  updateCartItem: async (productId, sizeIndex, change) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.sizeIndex === sizeIndex
          ? { ...item, quantity: item.quantity + change }
          : item,
      ),
    }));

    try {
      const updatedCart = useAuthStore.getState().cart;

      await ax.put(
        endpoint.customer.cart.update(useAuthStore.getState().user.id),
        {
          cart: updatedCart,
        },
      );
    } catch (e) {
      console.log(e);
    }
  },

  clearCart: async () => {
    set({ cart: [] });
    try {
      await ax.put(
        endpoint.customer.cart.update(useAuthStore.getState().user.id),
        {
          cart: [], // reset
        },
      );
    } catch (e) {
      console.log(e);
    }
  },
  updateJwt: (jwt) => {
    set((state) => {
      if (state.jwt !== jwt) {
        axData.jwt = jwt;
        return { jwt };
      }
      return state; // No state update if JWT is the same
    });
  },

  autoLogin: async () => {
    set({ isLoginPending: true });
    try {
      const jwt = Cookies.get(conf.userCookieName)
        ? JSON.parse(Cookies.get(conf.userCookieName))
        : null;
      if (jwt) {
        axData.jwt = jwt;
        const response = await ax.get(endpoint.auth.jwtUserWithRole);
        const userData = response.data;
        set({
          user: { ...userData, role: userData.role.name },
          cart: userData.cart || [],
        });
      }
    } catch (error) {
      console.error("Login failed:", error.message || "An error occurred");
    } finally {
      set({ isLoginPending: false });
    }
  },

  login: async (formData, navigate) => {
    try {
      const response = await ax.post(endpoint.auth.login, {
        identifier: formData.identifier,
        password: formData.password,
      });

      const { jwt, user: userData } = response.data;

      Cookies.set(conf.userCookieName, JSON.stringify(jwt), { path: "/" });
      useAuthStore.getState().updateJwt(jwt); // Use the store's method to update state
      axData.jwt = jwt; // Assign to Axios global config

      const roleResponse = await ax.get(endpoint.auth.jwtUserWithRole);
      const role = roleResponse.data.role.name;

      const cookieOptions = formData.rememberMe
        ? {
            path: "/",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          }
        : { path: "/" };

      set({ jwt });
      Cookies.set(conf.userCookieName, JSON.stringify(jwt), cookieOptions);
      set({
        user: { ...userData, role },
        cart: userData.cart || [],
        showModal: true,
        errMsg: null,
      });

      if (role === conf.role.customer) navigate(path.public.home);
      else if (role === conf.role.admin) navigate(path.admin.dashboard);
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
    Cookies.remove(conf.userCookieName);
    set({ user: null, jwt: null, cart: [] });
    navigate(path.public.home);
  },
}));

export default useAuthStore;
