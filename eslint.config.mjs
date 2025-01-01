// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import path from 'path';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'node_modules', 'dist'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.resolve('tsconfig.json'),
      },
    },
  },
);
