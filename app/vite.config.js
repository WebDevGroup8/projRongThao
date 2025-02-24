import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // INFO: Make alias absolute path for better import
      // INFO: To custom this alias also sync /src/jsconfig.json

      // @ is root alias for /src
      "@": path.resolve(__dirname, "./src"),

      "@components": path.resolve(__dirname, "./src/components"),

      // Route
      "@public": path.resolve(__dirname, "./src/components/public"),
      "@customer": path.resolve(__dirname, "./src/components/customer"),
      "@admin": path.resolve(__dirname, "./src/components/admin"),

      // Asset
      "@asset": path.resolve(__dirname, "./src/assets"),
    },
  },
});
