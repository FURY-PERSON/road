import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOption } from './types/config';

export function buildLoaders(options: BuildOption): webpack.RuleSetRule[] {
  const {isDev} = options;

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const stylesLoader = {
    test: /\.s|[ac]ss$/i,
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
  
  return [typescriptLoader, stylesLoader]
}