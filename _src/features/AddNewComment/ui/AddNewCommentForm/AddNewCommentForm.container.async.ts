import { lazy } from 'react';

export const AddNewCommentFormContainerAsync = lazy(() =>
  import('./AddNewCommentForm.container').then((module) => ({
    default: module.AddNewCommentFormContainer
  }))
);
