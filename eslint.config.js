import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      'no-unused-vars': 'warn',
      'no-undef': 'warn',

      quotes: ['error', 'single'],
      // we want to force semicolons
      semi: ['error', 'always'],
      // we use 2 spaces to indent our code
      indent: ['error', 2],
      // we want to avoid extraneous spaces
      'no-multi-spaces': ['error']
    }
  }
];
