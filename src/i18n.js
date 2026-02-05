import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from './locales';

// Map our "Full Name" keys to i18next resources
const resources = Object.keys(translations).reduce((acc, lang) => {
    acc[lang] = {
        translation: translations[lang]
    };
    return acc;
}, {});

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('user-language') || "English",
        fallbackLng: "English",
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        // Debugging during dev
        debug: true
    });

export default i18n;
