// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin, // burada plugin'i tanımlıyoruz
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
