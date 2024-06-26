export type BuildMode = 'development' | 'production';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  locales: string;
  buildLocales: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  analyze: boolean;
  apiUrl: string;
  settlementApiUrl: string;
}

export interface BuildOption {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  analyze: boolean;
  apiUrl: string;
  settlementApiUrl: string;
  project: 'storybook' | 'main' | 'jest';
}
