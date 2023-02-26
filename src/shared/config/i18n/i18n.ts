import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nextPlugin as translationCheckPlugin } from 'translation-check';
import { SupportedLanguages } from './types';

i18n
  .use(__IS__DEV__ ? translationCheckPlugin : null)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: SupportedLanguages.EN,
    fallbackLng: SupportedLanguages.EN,
    saveMissing: true,
    debug: !!__IS__DEV__,

    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
});

export default i18n;
