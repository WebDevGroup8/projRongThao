const apiUrlPrefix =
    import.meta.env.VITE_STATUS === "production"
        ? "https://deploy-registrar-systems-production.up.railway.app/api"
        : "http://localhost:1337/api";


const conf = {
    apiUrlPrefix,  // Prefix ของ API (local หรือ production)
    loginEndpoint: "/auth/local",  // 🔥 จุดสำคัญ! Endpoint สำหรับ login
    jwtSessionStorageKey: "auth.jwt",  // ชื่อ key สำหรับเก็บ JWT ใน session storage
    jwtRoleEndpoint: "users/me?populate=role",  // API สำหรับดึง Role ของผู้ใช้
    jwtUserEndpoint: "/users/me",  // API สำหรับดึงข้อมูล User ปัจจุบัน
};

export default conf;  // ส่งออก default
