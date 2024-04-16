import { Story } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenseDecorator = (Story: Story) => (
  <Suspense>
    <Story />
  </Suspense>
);
