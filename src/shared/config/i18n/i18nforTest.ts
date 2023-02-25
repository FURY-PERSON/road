import i18nForTests from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SupportedLanguages } from './types';

i18nForTests
  .use(initReactI18next)
  .init({
    lng: SupportedLanguages.EN,
    fallbackLng: SupportedLanguages.EN,
    ns: ['translationsNS'],
    defaultNS: 'translationsNS',

    debug: false,

    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {},
      ru: {}
    }
  });

export default i18nForTests;
