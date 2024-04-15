module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:i18next/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['**.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'jest',
    'eslint-plugin-jest',
    'jest-dom',
    'react-hooks',
    'unused-imports',
    'prettier'
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'none',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        bracketSameLine: false,
        jsxBracketSameLine: false,
        printWidth: 100
      }
    ],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'no-tabs': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.tsx']
      }
    ],
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'pace-infix-ops': 'off',
    'consistent-return': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-useless-return': 'off',
    'react/no-array-index-key': 'off',
    'no-undef': 'off',
    'object-shorthand': 'off',
    'eol-last': 'warn',
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after'
          }
        ],
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ]
      }
    ],
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-plusplus': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/extensions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'i18next/no-literal-string': ['error', { markupOnly: true }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always']
  },
  globals: {
    __IS__DEV__: true,
    __API__: true,
    __SETTLEMENT_API__: true,
    __PROJECT__: true
  },
  overrides: [
    {
      files: ['src/**/*.slice.ts'],
      rules: { 'no-param-reassign': ['error', { props: false }] }
    }
  ]
};
