import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import { BuildOption } from '../types/config';

export function buildDefinePlugin({
  isDev,
  apiUrl,
  project,
  settlementApiUrl
}: Pick<BuildOption, 'isDev' | 'apiUrl' | 'project' | 'settlementApiUrl'>) {
  return new webpack.DefinePlugin({
    __IS__DEV__: JSON.stringify(isDev),
    __API__: JSON.stringify(apiUrl),
    __SETTLEMENT_API__: JSON.stringify(settlementApiUrl),
    __PROJECT__: JSON.stringify(project)
  });
}

export function miniCssExtractPlugin() {
  return new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css'
  });
}
