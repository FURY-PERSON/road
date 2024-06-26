import path from 'path';

import webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

const paths: BuildPaths = {
  build: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  src: path.resolve(__dirname, 'src'),
  locales: path.resolve(__dirname, 'public', 'locales'),
  buildLocales: path.resolve(__dirname, 'build', 'locales')
};

export default function (env: BuildEnv): webpack.Configuration {
  const mode = env.mode || 'development';
  const isDev = mode === 'development';
  const port = env.port || 3000;
  const analyze = env.analyze || false;
  const apiUrl = env.apiUrl || 'http://localhost:3005/api';
  const settlementApiUrl = env.settlementApiUrl || 'http://localhost:80/api';

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    port,
    analyze,
    apiUrl,
    settlementApiUrl,
    project: 'main'
  });
}
