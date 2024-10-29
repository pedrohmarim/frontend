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
          ChooseProfile: require('./assets/i18next/ChooseProfile/pt.json'),
          GuildInfo: require('./assets/i18next/GuildInfo/pt.json'),
          Game: require('./assets/i18next/Game/pt.json'),
          Ranking: require('./assets/i18next/Ranking/pt.json'),
          Terms: require('./assets/i18next/Terms/pt.json'),
        },
        en: {
          Home: require('./assets/i18next/Home/en.json'),
          ChooseProfile: require('./assets/i18next/ChooseProfile/en.json'),
          GuildInfo: require('./assets/i18next/GuildInfo/en.json'),
          Game: require('./assets/i18next/Game/en.json'),
          Ranking: require('./assets/i18next/Ranking/en.json'),
          Terms: require('./assets/i18next/Terms/en.json'),
        },
      },
      fallbackLng: 'pt-BR', // Idioma padrão
      ns: ['Home', 'ChooseProfile', 'GuildInfo', 'Game', 'Ranking', 'Terms'], // Múltiplos namespaces
      defaultNS: 'Home', // Namespace padrão
      debug: false,
      interpolation: {
        escapeValue: false, // Evita escape de HTML
      },
      react: {
        useSuspense: false, // Evita problemas de carregamento no React
      },
    });
}

export default i18n;
