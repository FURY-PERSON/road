import { BuildPaths } from "../build/types/config";
import webpack from "webpack";
import path from "path";
import { buildCssLoader } from "../build/loaders/buildLoaders";

export default ({config}: {config: webpack.Configuration}) => {
  const isDev = config.mode === 'development';

  const paths:BuildPaths = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  }
  
  config.resolve.modules.push(paths.src);
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push(buildCssLoader(isDev))
  return config
}