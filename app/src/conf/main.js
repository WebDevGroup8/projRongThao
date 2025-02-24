const apiUrlPrefix =
  import.meta.env.VITE_STATUS === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL;

/**
 * Config Name
 */
export const conf = {
  githubUrl: "https://github.com/WebDevGroup8/projRongThao",
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
 * API Endpoint
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
    category: {
      create: () => `/categories`,
      query: () => `/categories`,
      delete: (documentId) => `/categories/${documentId}`,
      update: (documentId) => `/categories/${documentId}`,
    },
    order: {
      query: () => `/orders?populate=*`,
      update: (documentId) => `/orders/${documentId}`,
      delete: (documentId) => `/orders/${documentId}`,
    },
    product: {
      create: () => `/products`,
      query: () =>
        `/products?populate=image&populate=categories&populate=reviews`,
      update: (documentId) => `/products/${documentId}`,
      delete: (documentId) => `/products/${documentId}`,
    },
    promotion: {
      create: (documentId) => `/products/${documentId}`,
      delete: (documentId) => `/products/${documentId}`,

      coupon: {
        create: () => `/stripe/promotion`,
        query: () => `/stripe/promotions`,
        update: (id) => `/stripe/promotion/${id}`,
        delete: (id) => `/stripe/promotion/${id}`,
      },
    },
    meida: {
      upload: () => `/upload`,
      delete: (id) => `/upload/files/${id}`,
    },
    user: {
      customer: {
        query: () =>
          `/users?populate[role][filters][id]=${conf.role.customerId}&populate=order_histories`,
      },
    },
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
    size: `/size`,
    helps: `/helps`,
    shipping: `/shipping`,
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
