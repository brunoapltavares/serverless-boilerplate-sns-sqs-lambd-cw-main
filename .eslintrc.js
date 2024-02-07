module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended", // supports linting of import/export syntax & prevents issues with misspelled file paths
    "prettier", // turns off all rules that are unnecessary or might conflict with Prettier
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  // Necessary for ESLint to recognize Typescript path aliases
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },

  // Use TypeScript rules only on TypeScript files
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended", "plugin:import/typescript"],
    },
  ],

  rules: {},
};
