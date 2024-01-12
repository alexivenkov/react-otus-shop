import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export * from './settings';
