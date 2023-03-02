import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

const paths: BuildPaths = {
  build: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  src: path.resolve(__dirname, 'src'),
};

export default function (env: BuildEnv): webpack.Configuration {
  const mode = env.mode || 'development';
  const isDev = mode === 'development';
  const port = env.port || 3000;
  const analyze = env.analyze || false;

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    port,
    analyze,
  });
}
