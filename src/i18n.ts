import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const stored = (typeof localStorage !== 'undefined'
  ? localStorage.getItem('nextroute:lang')?.toLowerCase()
  : null) ?? 'en';

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: stored,
      fallbackLng: 'en',
      supportedLngs: ['en', 'ar', 'sw', 'it', 'el', 'es'],
      defaultNS: 'common',
      ns: ['common'],
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
}

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('nextroute:lang', lng);
  document.documentElement.setAttribute('lang', lng);
});

export default i18n;
