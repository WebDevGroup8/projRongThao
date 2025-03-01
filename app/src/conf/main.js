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
        `/products?populate=image&populate=categories&filters[stock][$gt]=0`,
    },
    category: {
      query: () => `/categories`,
    },
    review: {
      get: (id) =>
        `/reviews?populate=product&populate=user&filters[product][id]=${id}`,
      create: () => `/reviews`,
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
    message: {
      get: (id) =>
        `/messages?populate[sender][populate]=role&populate[receiver][populate]=role&filters[$or][0][sender][id]=${id}&filters[$or][1][receiver][id]=${id}`,
      create: () => `/messages`,
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
      query: () => `/products?populate=image&populate=categories`,
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
    review: {
      query: () => `/products?populate[reviews][populate]=user&populate=image`,
      delete: (documentId) => `/reviews/${documentId}`,
    },
    message: {
      get: (id) =>
        `/messages?populate[sender][populate]=role&populate[receiver][populate]=role&filters[$or][0][sender][id]=${id}&filters[$or][1][receiver][id]=${id}`,
      create: () => `/messages`,
    },
    meida: {
      upload: () => `/upload`,
      delete: (id) => `/upload/files/${id}`,
    },
    user: {
      customer: {
        queryMessage: () =>
          `/users?populate[messages]=*&populate[role]=*&filters[messages][$notNull]=true&filters[role][type][$eq]=${conf.role.customer}`,
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
    discoveryCategory: {
      new: `?category=new`,
      limited: `?category=limited`,
      sport: `?category=sport`,
      highTop: `?category=high top`,
      platform: `?category=platform`,
    },
    detail: `/product`,
    detailRoute: `/product/:id`,
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
    review: `/admin/review`,
    chat: `/admin/chat`,
  },
  otherwise: `*`,
};
