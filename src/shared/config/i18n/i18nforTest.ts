import i18nForTests from 'i18next';
import { initReactI18next } from 'react-i18next';

i18nForTests
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
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
