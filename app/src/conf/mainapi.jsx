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
};

export default conf; // ส่งออก default
