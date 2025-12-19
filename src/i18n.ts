import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './locales/es.yaml';
import en from './locales/en.yaml';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: es },
            en: { translation: en },
        },
        lng: 'es', // default language
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
