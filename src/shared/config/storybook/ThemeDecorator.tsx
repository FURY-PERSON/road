import { Story } from '@storybook/react';

import { Theme, ThemeProvider } from '@/shared/contexts/ThemeProvider';
import { ToggleFeatures } from '@/shared/lib/helpers/features';

export const ThemeDecorator = (theme: Theme) => (Story: Story) => {
  document.body.className = theme;
  return (
    <ThemeProvider>
      <ToggleFeatures
        feature="newDesign"
        off={
          <div id="app" className={`app ${theme}`}>
            <Story />
          </div>
        }
        on={
          <div id="app" className={`app_redesigned ${theme}`}>
            <Story />
          </div>
        }
      />
    </ThemeProvider>
  );
};
