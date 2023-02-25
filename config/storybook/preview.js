import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { I18nDecorator } from '../../src/shared/config/storybook/I18nDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import { Theme } from '../../src/shared/contexts/ThemeProvider';
import i18n from '../../src/shared/config/i18n/i18nforStorybook.ts';
import { SupportedLanguages } from '../../src/shared/config/i18n/types';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }, 
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: SupportedLanguages.EN,
  locales: {
    [SupportedLanguages.EN]: 'English',
    [SupportedLanguages.RU]: 'Russian',   
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: SupportedLanguages.EN, title: 'English' },
        { value: SupportedLanguages.RU, title: 'Русский' },
      ],
    },
  },
 };

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.Light));
addDecorator(RouterDecorator);
addDecorator(I18nDecorator);
