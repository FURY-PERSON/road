import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';

import { SupportedLanguages, TranslationNamespaces } from './types';

const ns = Object.values(TranslationNamespaces);
const supportedLngs = Object.values(SupportedLanguages);
const resources = ns.reduce((acc, n) => {
  supportedLngs.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      // eslint-disable-next-line import/no-dynamic-require, global-require
      [n]: require(`/public/locales/${lng}/${n}.json`)
    };
  });
  return acc;
}, {});

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: true,
    lng: SupportedLanguages.EN,
    fallbackLng: SupportedLanguages.EN,
    defaultNS: 'translation',
    ns,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs,
    resources,
    parseMissingKeyHandler: (key: string) => `No translation found for "${key}"`
  });

export default i18n;
