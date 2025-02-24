const apiUrlPrefix =
  import.meta.env.VITE_STATUS === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL;

export const conf = {
  apiUrlPrefix: `${apiUrlPrefix}/api`,
  imageUrlPrefix: apiUrlPrefix,
  loginEndpoint: "/auth/local",
  jwtSessionStorageKey: "auth.jwt",
  jwtRoleEndpoint: "users/me?populate=role",
  jwtUserEndpoint: "/users/me",

  productCreateEndpoint: `/products`,
};

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
