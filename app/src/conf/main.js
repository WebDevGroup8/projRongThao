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
 *
 * lable:
 *    get - for single item
 *  query - for multiple items
 *
 */
export const endpoint = {
  auth: {
    login: "/auth/local",
    register: "/users",
    jwtUser: "/users/me",
    jwtUserWithRole: "users/me?populate=role",
  },
  public: {
    product: {
      get: (id) =>
        `/products?populate=image&populate=categories&filters[id]=${id}`,
      query: () =>
        `/products?populate=image&populate=categories&populate=reviews&filters[stock][$gt]=0`,
    },
    category: {
      query: () => `/categories`,
    },
  },
  customer: {
    order: {
      create: () => `/orders`,
      query: () => `/users/me?populate=order_histories`,
    },
    cart: {
      update: (id) => `users/${id}`,
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
