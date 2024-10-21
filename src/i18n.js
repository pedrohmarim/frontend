import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        pt: {
          Home: require('./assets/i18next/Home/pt.json'),
        },
        en: {
          Home: require('./assets/i18next/Home/en.json'),
        },
      },
      fallbackLng: 'pt', // Idioma padrão
      ns: ['Home'], // Múltiplos namespaces
      defaultNS: 'Home', // Namespace padrão
      debug: true,
      interpolation: {
        escapeValue: false, // Evita escape de HTML
      },
      react: {
        useSuspense: false, // Evita problemas de carregamento no React
      },
    });
}

export default i18n;
