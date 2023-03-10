import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader, buildSvgLoader } from '../build/loaders/buildLoaders';
import { buildDefinePlugin, miniCssExtractPlugin } from '../build/plugins/buildPlugins';

export default ({ config }: {config: webpack.Configuration}) => {
  const isDev = config.mode === 'development';

  const paths:BuildPaths = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };
  
  config.resolve.modules.push(paths.src);
  config.resolve.extensions.push('.ts', '.tsx');

  // delete storybook internal svg loader
  // eslint-disable-next-line no-param-reassign
  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return ({ ...rule, exclude: /.svg$/i });
    }

    return rule;
  });
  
  config.plugins.push(miniCssExtractPlugin());
  config.module.rules.push(buildSvgLoader());
  config.plugins.push(buildDefinePlugin(isDev));

  config.module.rules.push(buildCssLoader(isDev));
  return config;
};
