const apiUrlPrefix =
  import.meta.env.VITE_STATUS === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL;

const conf = {
  apiUrlPrefix: `${apiUrlPrefix}/api`, // Prefix ของ API (local หรือ production)
  imageUrlPrefix: apiUrlPrefix,
  loginEndpoint: "/auth/local", // 🔥 จุดสำคัญ! Endpoint สำหรับ login
  jwtSessionStorageKey: "auth.jwt", // ชื่อ key สำหรับเก็บ JWT ใน session storage
  jwtRoleEndpoint: "users/me?populate=role", // API สำหรับดึง Role ของผู้ใช้
  jwtUserEndpoint: "/users/me", // API สำหรับดึงข้อมูล User ปัจจุบัน

  productCreateEndpoint: `/products`,
};

const path = {
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

export default { conf, path }; // ส่งออก default
