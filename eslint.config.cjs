// eslint.config.cjs
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const nextPlugin = require("@next/eslint-plugin-next");
const globals = require("globals");

/**
 * CommonJS uyumlu eslint config
 */
module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
