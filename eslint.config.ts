import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
export default tseslint.config(
  { ignores: ["dist", "coverage", "public", "backups", "audit", "assets-source", ".claude"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Klasická pravidla hooků; pravidla React Compileru (v7) projekt zatím nepoužívá.
  {
    plugins: { "react-hooks": reactHooks },
    rules: { "react-hooks/rules-of-hooks": "error", "react-hooks/exhaustive-deps": "warn" },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
);
