module.exports = {
	env: {
		browser: true,
		es2021: true,
		"jest/globals": true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb',
		'plugin:i18next/recommended',
	],
	overrides: [
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
		'jest'
	],
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 'off',
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-filename-extension': [1, {
			extensions: ['.jsx', '.tsx'],
		}],
		'no-unused-vars': 'off',
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/no-unresolved': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
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
};
