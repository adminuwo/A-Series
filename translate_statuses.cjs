const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const keysToAdd = {
    "free": {
        "hindi": "निःशुल्क",
        "bengali": "বিনামূল্যে",
        "marathi": "मोफत",
        "gujarati": "મફત",
        "tamil": "இலவசம்",
        "telugu": "ఉచితం",
        "arabic": "مجاني",
        "english": "Free",
        "french": "Gratuit",
        "spanish": "Gratis"
    },
    "draft": {
        "hindi": "ड्राफ्ट",
        "bengali": "খসড়া",
        "marathi": "मसुदा",
        "gujarati": "ડ્રાફ્ટ",
        "tamil": "வரைவு",
        "telugu": "చిత్తుప్రతి",
        "arabic": "مسودة",
        "english": "Draft",
        "french": "Brouillon",
        "spanish": "Borrador"
    },
    "active": {
        "hindi": "सक्रिय",
        "bengali": "সক্রিয়",
        "marathi": "सक्रिय",
        "gujarati": "સક્રિય",
        "tamil": "செயலில்",
        "telugu": "యాక్టివ్",
        "arabic": "نشط",
        "english": "Active",
        "french": "Actif",
        "spanish": "Activo"
    },
    "inactive": {
        "hindi": "निष्क्रिय",
        "bengali": "নিষ্ক্রিয়",
        "marathi": "निष्क्रिय",
        "gujarati": "નિષ્ક્રિય",
        "tamil": "செயலற்றது",
        "telugu": "నిష్క్రియ",
        "arabic": "غير نشط",
        "english": "Inactive",
        "french": "Inactif",
        "spanish": "Inactivo"
    },
    "live": {
        "hindi": "लाइव",
        "bengali": "লাইভ",
        "marathi": "थेट",
        "gujarati": "લાઇવ",
        "tamil": "நேரலை",
        "telugu": "లైవ్",
        "arabic": "مباشر",
        "english": "Live",
        "french": "En direct",
        "spanish": "En vivo"
    },
    "pending": {
        "hindi": "लंबित",
        "bengali": "অপেক্ষমান",
        "marathi": "प्रलंबित",
        "gujarati": "બાકી",
        "tamil": "நிலுவையில்",
        "telugu": "పెండింగ్",
        "arabic": "قيد الانتظار",
        "english": "Pending",
        "french": "En attente",
        "spanish": "Pendiente"
    }
};

const languages = ["hindi", "bengali", "marathi", "gujarati", "tamil", "telugu", "arabic", "english", "french", "spanish"];

languages.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            Object.keys(keysToAdd).forEach(key => {
                // Determine the correct key casing or nesting if needed. 
                // For now, I'll add them as top-level keys or overwrite existing simple keys using lowercase.
                // If they exist as Capitalized in English, I'll still provide lowercase keys for easier programmatic access.

                content[key] = keysToAdd[key][lang];

                // Also add capitalized versions just in case direct key access is used elsewhere
                // content[key.charAt(0).toUpperCase() + key.slice(1)] = keysToAdd[key][lang];
            });

            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            console.log(`Updated keywords in ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json`, e);
        }
    }
});
