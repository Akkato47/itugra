import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@pages": path.resolve("./src/pages"),
      "@widgets": path.resolve("./src/widgets"),
      "@features": path.resolve("./src/features"),
      "@entities": path.resolve("./src/entities"),
      "@shared": path.resolve(__dirname, "./src/shared")
    }
  },
  build: {
    chunkSizeWarningLimit: 1000
  },
  preview: {
    port: 5173
  },
  server: {
    port: 5173
  },
  envPrefix: ["VITE_", "BASE_", "YANDEX_"]
});
