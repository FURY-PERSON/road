import { ResolveOptions } from 'webpack';
import { BuildOption } from './types/config';

export function buildResolvers(options: BuildOption): ResolveOptions {
  return {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    preferAbsolute: true,
    mainFiles: ['index'],
    modules: [options.paths.src, 'node_modules'],
    alias: {},
  };
}
