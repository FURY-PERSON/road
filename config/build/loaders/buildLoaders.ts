import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import sass from 'sass';

import { BuildOption } from '../types/config';
import { babelRemovePropsPlugin } from '../babelPlugins/babelRemovePropsPlugin';

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.(sc|sa|c)ss$/,
    exclude: '/node_modules/',
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDev,
          modules: {
            auto: (path: string) => !!path.includes('.module.'),
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]'
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          // Prefer `dart-sass`
          implementation: sass
        }
      }
    ]
  };
}

export function buildSvgLoader() {
  return {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  };
}

interface BuildBabelLoaderProps extends BuildOption {
  isTsx: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
  const plugins: any = [
    [
      '@babel/plugin-transform-typescript',
      {
        isTsx
      }
    ],
    '@babel/plugin-transform-runtime'
  ];

  if (!isDev && isTsx) {
    plugins.push([
      babelRemovePropsPlugin,
      {
        props: ['data-testid']
      }
    ]);
  }

  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins: plugins
      }
    }
  };
}
