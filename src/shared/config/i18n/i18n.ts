import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nextPlugin as translationCheckPlugin } from 'translation-check';

import { SupportedLanguages } from './types';

if (__IS__DEV__) {
  i18n.use(translationCheckPlugin);
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: SupportedLanguages.RU,
    fallbackLng: SupportedLanguages.RU,
    saveMissing: true,
    debug: !!__IS__DEV__,

    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    parseMissingKeyHandler: (key: string) =>
      __IS__DEV__ ? `No translation found for "${key}"` : key
  });

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
});

export default i18n;
