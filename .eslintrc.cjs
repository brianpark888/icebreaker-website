/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true
  },
  plugins: [],
  extends: [], // 🔕 No rule presets
  rules: {}    // 🚫 No custom rules
};

module.exports = config;
