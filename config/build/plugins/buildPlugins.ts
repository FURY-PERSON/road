import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

export function buildDefinePlugin(isDev: boolean) {
  return new webpack.DefinePlugin({
    __IS__DEV__: isDev,
  });
}

export function miniCssExtractPlugin() {
  return new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css',
  })
}