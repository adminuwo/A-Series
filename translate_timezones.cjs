const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const timezoneKeywords = {
    "Standard Time": {
        "hindi": "मानक समय",
        "bengali": "প্রমিত সময়",
        "marathi": "प्रमाण वेळ",
        "gujarati": "પ્રમાણભૂત સમય",
        "tamil": "திட்ட நேரம்",
        "telugu": "సాధారణ సమయం",
        "arabic": "التوقيت القياسي",
        "french": "Heure normale",
        "spanish": "Hora estándar"
    },
    "Daylight Time": {
        "hindi": "दिन का समय",
        "bengali": "দিালোক সময়",
        "marathi": "डेलाइट वेळ",
        "gujarati": "ડેલાઇટ સમય",
        "tamil": "பகல் நேரம்",
        "telugu": "పగటి సమయం",
        "arabic": "التوقيت الصيفي",
        "french": "Heure d'été",
        "spanish": "Hora de verano"
    },
    "International Date Line West": {
        "hindi": "अंतर्राष्ट्रीय तिथि रेखा पश्चिम",
        "spanish": "Línea internacional de cambio de fecha oeste",
        "french": "Ligne de changement de date ouest",
        "arabic": "خط التاريخ الدولي غرب"
    },
    "Pacific": {
        "hindi": "प्रशांत",
        "spanish": "Pacífico",
        "french": "Pacifique",
        "arabic": "المحيط الهادئ"
    },
    "Mountain": {
        "hindi": "माउंटेन",
        "spanish": "Montaña",
        "french": "Montagne",
        "arabic": "جبل"
    },
    "Central": {
        "hindi": "मध्य",
        "spanish": "Central",
        "french": "Centre",
        "arabic": "وسط"
    },
    "Eastern": {
        "hindi": "पूर्वी",
        "spanish": "Este",
        "french": "Est",
        "arabic": "شرق"
    },
    "India": {
        "hindi": "भारत",
        "bengali": "ভারত",
        "marathi": "भारत",
        "gujarati": "ભારત",
        "tamil": "இந்தியா",
        "telugu": "భారత",
        "arabic": "الهند",
        "spanish": "India",
        "french": "Inde"
    }
};

const commonKeys = {
    "selectTimezone": {
        "english": "Select Timezone",
        "hindi": "समय क्षेत्र चुनें",
        "bengali": "সময় অঞ্চল নির্বাচন করুন",
        "marathi": "वेळ क्षेत्र निवडा",
        "gujarati": "સમય ઝોન પસંદ કરો",
        "tamil": "நேர மண்டலத்தைத் தேர்ந்தெடுக்கவும்",
        "telugu": "సమయ మండలాన్ని ఎంచుకోండి",
        "arabic": "اختر المنطقة الزمنية",
        "french": "Sélectionner le fuseau horaire",
        "spanish": "Seleccionar zona horaria"
    }
};


const languages = ["hindi", "bengali", "marathi", "gujarati", "tamil", "telugu", "arabic", "english", "french", "spanish"];

languages.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Add common keys top level
            Object.keys(commonKeys).forEach(key => {
                content[key] = commonKeys[key][lang] || commonKeys[key]['english'];
            });

            // Add timezoneKeywords object
            if (!content.timezoneKeywords) content.timezoneKeywords = {};

            Object.keys(timezoneKeywords).forEach(key => {
                const val = timezoneKeywords[key][lang];
                if (val) {
                    content.timezoneKeywords[key] = val;
                }
            });

            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            console.log(`Updated timezone keywords in ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json`, e);
        }
    }
});
