import { defineConfig } from "vite";
import "dotenv/config";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { generateIconOptions } from "./generate-icon-options.js";

export default defineConfig(({ mode }) => ({
  plugins: [
    laravel({
      input: ["src/index.tsx"],
      refresh: ["site/templates/**", "site/snippets/**"],
      publicDirectory: "./",
    }),
    react(),
    generateIconOptions,
  ],
}));
