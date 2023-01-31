import path from 'path';
import webpack, { ResolveOptions } from 'webpack';

export function buildResolvers(): ResolveOptions {

  return {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }  
}