import { lazy } from 'react';

export const RegisterPageAsync = lazy(() =>
  import('./RegisterPage').then((module) => ({ default: module.RegisterPage }))
);
