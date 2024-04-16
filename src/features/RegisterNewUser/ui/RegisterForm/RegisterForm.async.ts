import { lazy } from 'react';

export const RegisterFormAsync = lazy(() =>
  import('./RegisterForm').then((module) => ({ default: module.RegisterForm }))
);
