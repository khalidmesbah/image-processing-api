module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: [["@typescript-eslint", "prettier"], "@typescript-eslint"],
  rules: {
    "prettier/prettier": 2,
    semi: ["error", "never"],
    quotes: ["error", "single"],
    "prettier/prettier": 2, // Means error
    "no-console": 1, // Means warning
    "no-var": "error",
    "prefer-const": "error",
  },
};
