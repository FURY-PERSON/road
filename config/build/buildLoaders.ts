import path from 'path';
import webpack from 'webpack';

export function buildLoaders(): webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const stylesLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          // Prefer `dart-sass`
          implementation: require("sass"),
        },
      },
    ],
  }
  
  return [typescriptLoader, stylesLoader]
}