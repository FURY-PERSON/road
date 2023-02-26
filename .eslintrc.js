module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:i18next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'jest',
    'eslint-plugin-jest',
    'jest-dom',
  ],
  rules: {
    indent: [1, 2],
    'no-tabs': 'off',
    'react/jsx-indent': [2, 2],
    'react/jsx-filename-extension': [1, {
      extensions: ['.jsx', '.tsx'],
    }],
    'react/function-component-definition': 'off',
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'pace-infix-ops': 'off',
    'object-curly-spacing': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'no-multiple-empty-lines': 'warn',
    'eol-last': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'comma-dangle': 'warn',
    'no-trailing-spaces': 'off',
    'import/extensions': 'off',
    'max-len': [1, {
      ignoreComments: true, tabWidth: 2, code: 100, ignoreStrings: true, ignoreUrls: true, 
    }],
    'i18next/no-literal-string': ['error', { markupOnly: true }],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'warn',
      'single',
    ],
    semi: [
      'warn',
      'always',
    ],
  },
  globals: {
    __IS__DEV__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
};
