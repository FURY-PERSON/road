import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOption } from './types/config';
import { buildDefinePlugin, miniCssExtractPlugin } from './plugins/buildPlugins';

export function buildPlugins({
  paths, isDev, analyze, apiUrl, 
}: BuildOption): webpack.WebpackPluginInstance[] {
  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    miniCssExtractPlugin(),
    buildDefinePlugin(isDev, apiUrl),
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
