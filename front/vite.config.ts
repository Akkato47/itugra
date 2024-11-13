import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@shared": path.resolve(__dirname, "./src/shared")
    }
  },
  preview: {
    port: 5173
  },
  server: {
    port: 5173
  },
  envPrefix: ["VITE_", "BASE_", "YANDEX_"]
});
