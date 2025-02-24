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
  },
  customer: {
    cart: `/cart`,
    order: `/order`,
  },
  admin: {
    default: `/admin`,
    dashboard: `/admin/dashboard`,
    product: `/admin/product`,
    category: `/admin/category`,
    promotion: `/admin/promotion`,
  },
  otherwise: `*`,
};
