import webpack from 'webpack';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { BuildOption } from './types/config';
import { buildBabelLoader, buildCssLoader, buildSvgLoader } from './loaders/buildLoaders';

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

  const svgLoader = buildSvgLoader();

  const pngLoader = {
    test: /\.(png|jpg|gif)$/i,
    type: 'asset/resource',
  };

  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  const stylesLoader = buildCssLoader(isDev);

  return [
    pngLoader,
    svgLoader,
    codeBabelLoader,
    tsxBabelLoader,
    stylesLoader,
  ];
}
