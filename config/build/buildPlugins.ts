import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOption } from './types/config';
import { buildDefinePlugin } from './plugins/buildPlugins';

export function buildPlugins({ paths, isDev, analyze }: BuildOption): webpack.WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    buildDefinePlugin(isDev),
    isDev && new ReactRefreshWebpackPlugin(),
    analyze && new BundleAnalyzerPlugin(),
  ].filter(Boolean);
}
