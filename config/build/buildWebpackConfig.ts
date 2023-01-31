import { BuildOption } from "./types/config";
import webpack from "webpack";
import path from 'path';
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildPlugins } from "./buildPlugins";

export function buildWebpackConfig(options: BuildOption): webpack.Configuration {
  const {mode, paths} = options;

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
  };
}