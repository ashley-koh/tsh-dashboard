module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "prettier",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "tsconfig.json",
        sourceType: "module",
      },
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    },
  ],
};
