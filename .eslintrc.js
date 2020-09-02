module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier", "react-hooks"],
  rules: {
    // disable prop-types verify
    "react/prop-types": [0],
    // disable function params should be explicit
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // disable some specific types verify
    "@typescript-eslint/ban-types": [0],
    // not every react components needs a displayname
    "react/display-name": [0],
    // allow to use any
    "@typescript-eslint/no-explicit-any": [0],
    "@typescript-eslint/no-var-requires": [0],
    // hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    // prttier
    "prettier/prettier": ["warn", {"singleQuote": true, "parser": "flow", "endOfLine":"auto"}],
    semi: ["error", "never"],
    camelcase: 0,
  },
};
