import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import th from './th.json';

const resources = {
  en: {
    translation: en,
  },
  th: {
    translation: th,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
});

export default i18n;
