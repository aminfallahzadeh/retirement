// IMPORTS
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.VITE_BASE_URL;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: BASE_URL,
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
