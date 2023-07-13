import { Story } from '@storybook/react';
import '@/app/styles/index.scss';

export const StyleDecorator = (Story: Story) => (
  <div style={{ minHeight: '100vh', display: 'flex' }}>
    <Story />
  </div>
);
