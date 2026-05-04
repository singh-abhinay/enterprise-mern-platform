import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      overlay: true,
    },
    force: true,
  },
  optimizeDeps: {
    force: true,
    entries: ["src/**/*.jsx", "src/**/*.js"],
  },
  cacheDir: "node_modules/.vite-cache",
});
