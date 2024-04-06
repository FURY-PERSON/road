import { lazy } from 'react';

export const FormAsync = lazy(() => import('./Form').then((module) => ({ default: module.Form })));
