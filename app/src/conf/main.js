const apiUrlPrefix =
  import.meta.env.VITE_STATUS === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL;

/**
 * Config Name
 */
export const conf = {
  apiUrlPrefix: `${apiUrlPrefix}/api`,
  imageUrlPrefix: apiUrlPrefix,
  jwtSessionStorageKey: "auth.jwt",
  userCookieName: "user",
  role: {
    customer: `customer`,
    customerId: 3,
    admin: `admin`,
  },
};

/**
 * Endpoint
 */
export const endpoint = {
  auth: {
    login: "/auth/local",
    jwtUser: "/users/me",
    jwtUserWithRole: "users/me?populate=role",
  },
  public: {},
  customer: {
    cart: {
      updateCart: (id) => `users/${id}`,
    },
  },
  admin: {
    productCreateEndpoint: `/products`,
  },
};

/**
 * Path
 */
export const path = {
  public: {
    home: `/`,
    discovery: `/discovery`,
    detail: `/product`,
    login: `/login`,
    register: `/register`,
    // TODO: discuss on this path
    help: `/help`,
  },
  customer: {
    cart: `/cart`,
    order: `/order`,
    // TODO: discuss on this path
    setting: `/setting`,
  },
  admin: {
    default: `/admin`,
    dashboard: `/admin/dashboard`,
    order: `/admin/order`,
    product: `/admin/product`,
    category: `/admin/category`,
    promotion: `/admin/promotion`,
  },
  otherwise: `*`,
};
