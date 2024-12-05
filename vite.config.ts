// IMPORTS
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/retirement/",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@images": resolve(__dirname, "src/assets/images"),
      "@fonts": resolve(__dirname, "src/assets/fonts"),
    },
  },
});
