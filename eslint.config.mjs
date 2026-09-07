import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import daStyle from "eslint-config-dicodingacademy";

export default defineConfig([
  daStyle,
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
  },
]);