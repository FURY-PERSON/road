import { Story } from '@storybook/react';
import { Theme, ThemeProvider } from 'shared/contexts/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (Story: Story) => (
  <div className={`app ${theme}`}>
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  </div>
);
