import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { files: ['src/**/*.{js,cjs,mjs,ts}'] },
  {
    ignores: ['dist/**/*.{js,cjs,mjs,ts}', 'node_modules/**/*.{js,cjs,mjs,ts}'],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
