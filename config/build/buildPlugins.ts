import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { BuildOption } from './types/config';
import { buildDefinePlugin, miniCssExtractPlugin } from './plugins/buildPlugins';

export function buildPlugins(options: BuildOption): webpack.WebpackPluginInstance[] {
  const { isDev, analyze, paths } = options;

  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.ProgressPlugin(),
    buildDefinePlugin(options),
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
    }));
  }

  if (!isDev) {
    plugins.push(miniCssExtractPlugin());
    plugins.push(new CopyPlugin({
      patterns: [
        { from: paths.locales, to: paths.buildLocales },
      ],
    }));
  }

  if (analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
