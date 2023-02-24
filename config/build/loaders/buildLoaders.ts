import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import sass from 'sass';

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.(sc|sa|c)ss$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDev,
          modules: {
            auto: (path: string) => !!path.includes('.module.'),
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          // Prefer `dart-sass`
          implementation: sass,
        },
      },
    ],
  };

}