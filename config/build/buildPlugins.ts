import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import  MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOption } from './types/config';

export function buildPlugins({paths, isDev}: BuildOption): webpack.WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      __IS__DEV__: isDev
    })
  ]
}