// import globals from "globals";
// import pluginJs from "@eslint/js";


// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
// ];



import globals from "globals";
import js from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: 2021, // Enables modern JS features
      sourceType: "module", // Allows ES Modules
      globals: globals.node, // Sets up Node.js globals
    },
    plugins: {
      js, // Use the imported ESLint JS plugin properly
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
    },
  },
];
