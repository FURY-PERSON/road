import { Story } from '@storybook/react';
import { Theme, ThemeProvider } from '@/shared/contexts/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (Story: Story) => {
  document.body.className = theme;
  return (
    <ThemeProvider>
      <div id="app" className={`app ${theme}`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};
