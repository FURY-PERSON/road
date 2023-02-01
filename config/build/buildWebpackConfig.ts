import { BuildOption } from "./types/config";
import webpack from "webpack";
import path from 'path';
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildPlugins } from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOption): webpack.Configuration {
  const {mode, paths, isDev} = options;

  return {
    mode: mode,
    entry: paths.entry,
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),
    plugins: buildPlugins(options),
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    devtool: isDev ? 'inline-source-map' : undefined
  };
}