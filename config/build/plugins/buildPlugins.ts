import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

export function buildDefinePlugin(isDev: boolean, apiUrl: string) {
  return new webpack.DefinePlugin({
    __IS__DEV__: JSON.stringify(isDev),
    __API__: JSON.stringify(apiUrl),
  });
}

export function miniCssExtractPlugin() {
  return new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css',
  });
}
