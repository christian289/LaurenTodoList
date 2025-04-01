import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      reactHooks,
      prettier,
    },
    rules: {
      "prettier/prettier": ["error", { singleQuote: false, semi: true }], // ✅ Prettier 스타일 강제 적용
      quotes: ["error", "double"], // ✅ Next.js에서는 큰따옴표 사용
      semi: ["error", "always"], // ✅ 세미콜론 사용
      "jsx-quotes": ["error", "prefer-double"], // ✅ JSX에서는 큰따옴표 사용
      "comma-dangle": ["error", "es5"], // ✅ ESLint에서 올바른 규칙명 사용
      "react/prop-types": "off",
      "no-console": "warn",
      "no-unused-vars": "warn",
      "react-hooks/rules-of-hooks": "error", // ✅ React Hooks 규칙 강제
      "react-hooks/exhaustive-deps": "warn", // ✅ useEffect의 종속성 배열 검증
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  tseslint.config(
    { ignores: ["dist"] },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
    }
  ),
];
