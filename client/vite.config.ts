import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    proxy: {
      "/api": {
      target: "https://104.208.120.163.nip.io",
      changeOrigin: true,
      secure: false, // <-- ignores self-signed certificate
    },
    },
    host: "::",
    port: 8000,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

