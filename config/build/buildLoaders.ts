import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOption } from './types/config';
import ReactRefreshTypeScript from 'react-refresh-typescript';

export function buildLoaders(options: BuildOption): webpack.RuleSetRule[] {
  const {isDev} = options;

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

  const pngLoader = {
    test: /\.(png|jpg|gif)$/i,
    type: 'asset/resource'
  }

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
  }

  const stylesLoader = {
    test: /\.(sc|sa|c)ss$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          sourceMap: isDev,
          modules: {
            auto: (path: string) => !!path.includes('.module.'),
            localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : '[hash:base64:8]',
          }
        }
      },
      {
        loader: "sass-loader",
        options: {
          // Prefer `dart-sass`
          implementation: require("sass"),
        },
      },
    ],
  }
  
  return [pngLoader, svgLoader, typescriptLoader, stylesLoader]
}