/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import path from 'path';

import webpack, { RuleSetRule } from 'webpack';

import { BuildPaths } from '../build/types/config';
import { buildCssLoader, buildSvgLoader } from '../build/loaders/buildLoaders';
import { buildDefinePlugin, miniCssExtractPlugin } from '../build/plugins/buildPlugins';

export default ({ config }: { config: webpack.Configuration }) => {
  const isDev = config.mode === 'development';

  const paths: BuildPaths = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    buildLocales: '',
    locales: ''
  };

  const apiUrl = 'http://localhost:3005/api/';
  const settlementApiUrl = 'http://localhost:80/api/';

  config.resolve!.modules!.push(paths.src);
  config.resolve!.extensions!.push('.ts', '.tsx');

  config.resolve!.alias = {
    ...config.resolve!.alias,
    '@': paths.src
  };

  // delete storybook internal svg loader
  // eslint-disable-next-line no-param-reassign
  // @ts-ignore webpack type error
  config.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /.svg$/i };
    }

    return rule;
  });

  config.plugins!.push(miniCssExtractPlugin());
  config.module!.rules.push(buildSvgLoader());
  config.plugins!.push(
    buildDefinePlugin({ isDev, apiUrl, project: 'storybook', settlementApiUrl })
  );

  config.module!.rules.push(buildCssLoader(isDev));
  return config;
};
