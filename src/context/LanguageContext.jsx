import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import to initialize i18n

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { t: i18nT, i18n } = useTranslation();
    const [region, setRegion] = useState(localStorage.getItem('user-region') || 'World');
    // Initialize language state from i18n's current language to keep them in sync
    const [language, setLanguageState] = useState(localStorage.getItem('user-language') || i18n.language || 'English');

    // Wrap t function to support arrays/objects by default (matching previous behavior)
    const t = (key, options) => i18nT(key, { returnObjects: true, ...options });

    useEffect(() => {
        localStorage.setItem('user-region', region);
    }, [region]);

    // When language changes, update i18n and localStorage
    const setLanguage = (lang) => {
        setLanguageState(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem('user-language', lang);
    };

    const regions = {
        'World': [
            "English", "Hindi", "Spanish", "French", "Arabic"
        ],
        'India': [
            "Hindi", "Tamil", "Telugu", "Marathi", "Bengali", "Gujarati", "English"
        ]
    };

    const regionFlags = {
        'India': 'IN',
        'United States': 'US',
        'United Kingdom': 'GB',
        'Spain': 'ES',
        'France': 'FR',
        'United Arab Emirates': 'AE'
    };

    const regionTimezones = {
        'India': 'India (GMT+5:30)',
        'United States': 'Eastern Time (GMT-5:00)',
        'United Kingdom': 'Greenwich Mean Time (GMT+0:00)',
        'Spain': 'Central European Time (GMT+1:00)',
        'France': 'Central European Time (GMT+1:00)',
        'United Arab Emirates': 'Gulf Standard Time (GMT+4:00)'
    };

    const allTimezones = [
        "International Date Line West (GMT-12:00)",
        "Samoa Standard Time (GMT-11:00)",
        "Hawaii-Aleutian Standard Time (GMT-10:00)",
        "Alaska Standard Time (GMT-9:00)",
        "Pacific Standard Time (GMT-8:00)",
        "Mountain Standard Time (GMT-7:00)",
        "Central Standard Time (GMT-6:00)",
        "Eastern Standard Time (GMT-5:00)",
        "Atlantic Standard Time (GMT-4:00)",
        "Brasília Time (GMT-3:00)",
        "South Georgia Time (GMT-2:00)",
        "Azores Time (GMT-1:00)",
        "Greenwich Mean Time (GMT+0:00)",
        "Central European Time (GMT+1:00)",
        "Eastern European Time (GMT+2:00)",
        "Moscow Time (GMT+3:00)",
        "Gulf Standard Time (GMT+4:00)",
        "India Standard Time (GMT+5:30)",
        "Bangladesh Standard Time (GMT+6:00)",
        "Indochina Time (GMT+7:00)",
        "China Standard Time (GMT+8:00)",
        "Japan Standard Time (GMT+9:00)",
        "Australian Eastern Time (GMT+10:00)",
        "Solomon Islands Time (GMT+11:00)",
        "New Zealand Time (GMT+12:00)"
    ];

    const languages = [].concat(...Object.values(regions));
    const uniqueLanguages = [...new Set(languages)];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, languages: uniqueLanguages, region, setRegion, regions, regionFlags, allTimezones, regionTimezones }
        }>
            {children}
        </LanguageContext.Provider >
    );
};

export const useLanguage = () => useContext(LanguageContext);
