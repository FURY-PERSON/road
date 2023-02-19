import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import sass from 'sass';
import { BuildOption } from './types/config';

const i18nExtractPlugin = [
	'i18next-extract',
	{
		locales: ['en', 'ru'],
		keyAsDefaultValue: false,
		saveMissing: true,
		keySeparator: null,
		outputPath: 'public/locales/{{locale}}/{{ns}}.json',
	},
];

export function buildLoaders(options: BuildOption): webpack.RuleSetRule[] {
	const { isDev } = options;

	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};

	const pngLoader = {
		test: /\.(png|jpg|gif)$/i,
		type: 'asset/resource',
	};

	const babelLoader = {
		test: /\.(js|jsx|ts|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [
					/*           i18nExtractPlugin */
				],
			},
		},
	};

	const typescriptLoader = {
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
					transpileOnly: isDev,
				},
			},
		],
		exclude: /node_modules/,
	};

	const stylesLoader = {
		test: /\.(sc|sa|c)ss$/,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					sourceMap: isDev,
					modules: {
						auto: (path: string) => !!path.includes('.module.'),
						localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
					},
				},
			},
			{
				loader: 'sass-loader',
				options: {
					// Prefer `dart-sass`
					implementation: sass,
				},
			},
		],
	};

	return [
		pngLoader,
		svgLoader,
		babelLoader,
		typescriptLoader,
		stylesLoader,
	];
}
