import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.base.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "import": importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // =========================================================
      // 1. HARD DETERMINISM VIOLATIONS (CRITICAL)
      // =========================================================
      "no-restricted-globals": [
        "error",
        { name: "Date", message: "NON-DETERMINISTIC: Use injected deterministic clock service instead of Date." },
        { name: "Math.random", message: "NON-DETERMINISTIC: Use deterministic RNG service if required." },
        { name: "JSON", message: "Direct JSON serialization is forbidden in deterministic paths. Use ArtifactSerializer." }
      ],

      // =========================================================
      // 2. OBJECT & MAP DETERMINISM ENFORCEMENT
      // =========================================================
      "no-restricted-properties": [
        "error",
        { object: "Object", property: "keys", message: "Use deterministic key sorting via canonicalization layer." },
        { object: "Object", property: "entries", message: "Use deterministic entry iteration via canonicalization layer." }
      ],

      // =========================================================
      // 3. MUTABILITY RESTRICTIONS (REPLAY SAFETY)
      // =========================================================
      "no-param-reassign": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "prefer-const": "error",
      "no-var": "error",
    }
  }
];
