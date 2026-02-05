const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const keysToAdd = {
    "accountOverview": {
        "english": "Account Overview",
        "hindi": "खाता अवलोकन",
        "bengali": "অ্যাকাউন্ট ওভারভিউ",
        "marathi": "खाते आढावा",
        "gujarati": "એકાઉન્ટ વિહંગાવલોકન",
        "tamil": "கணக்கு கண்ணோட்டம்",
        "telugu": "ఖాతా అవలోకనం",
        "arabic": "نظرة عامة على الحساب",
        "french": "Aperçu du compte",
        "spanish": "Resumen de la cuenta"
    },
    "accountType": {
        "english": "Account Type",
        "hindi": "खाता प्रकार",
        "bengali": "অ্যাকাউন্টের ধরন",
        "marathi": "खात्याचा प्रकार",
        "gujarati": "ખાતાનો પ્રકાર",
        "tamil": "கணக்கு வகை",
        "telugu": "ఖాతా రకం",
        "arabic": "نوع الحساب",
        "french": "Type de compte",
        "spanish": "Tipo de cuenta"
    },
    "userRole": {
        "english": "User",
        "hindi": "उपयोगकर्ता",
        "bengali": "ব্যবহারকারী",
        "marathi": "वापरकर्ता",
        "gujarati": "વપરાશકર્તા",
        "tamil": "பயனர்",
        "telugu": "వినియోగదారు",
        "arabic": "مستخدم",
        "french": "Utilisateur",
        "spanish": "Usuario"
    },
    "adminRole": {
        "english": "Admin",
        "hindi": "प्रशासक",
        "bengali": "প্রশাসক",
        "marathi": "प्रशासक",
        "gujarati": "એડમિન",
        "tamil": "நிர்வாகி",
        "telugu": "అడ్మిన్",
        "arabic": "مشرف",
        "french": "Administrateur",
        "spanish": "Administrador"
    },
    "developerRole": {
        "english": "Developer",
        "hindi": "डेवलपर",
        "bengali": "বিকাশকারী",
        "marathi": "डेव्हलपर",
        "gujarati": "વિકાસકર્તા",
        "tamil": "டெவலப்பர்",
        "telugu": "డెవలపర్",
        "arabic": "مطور",
        "french": "Développeur",
        "spanish": "Desarrollador"
    },
    "notifications": {
        "english": "Notifications",
        "hindi": "सूचनाएं",
        "bengali": "বিজ্ঞপ্তি",
        "marathi": "सूचना",
        "gujarati": "સૂચનાઓ",
        "tamil": "அறிவிப்புகள்",
        "telugu": "నోటిఫికేషన్‌లు",
        "arabic": "إشعارات",
        "french": "Notifications",
        "spanish": "Notificaciones"
    },
    "enabled": {
        "english": "Enabled",
        "hindi": "सक्षम",
        "bengali": "সক্ষম",
        "marathi": "सक्षम",
        "gujarati": "સક્ષમ",
        "tamil": "இயக்கப்பட்டது",
        "telugu": "ప్రారంభించబడింది",
        "arabic": "مُمكّن",
        "french": "Activé",
        "spanish": "Habilitado"
    },
    "disabled": {
        "english": "Disabled",
        "hindi": "अक्षम",
        "bengali": "অক্ষম",
        "marathi": "अक्षम",
        "gujarati": "અક્ષમ",
        "tamil": "முடக்கப்பட்டது",
        "telugu": "నిలిపివేయబడింది",
        "arabic": "معطل",
        "french": "Désactivé",
        "spanish": "Deshabilitado"
    }
};

const languages = ["hindi", "bengali", "marathi", "gujarati", "tamil", "telugu", "arabic", "english", "french", "spanish"];

languages.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            Object.keys(keysToAdd).forEach(key => {
                content[key] = keysToAdd[key][lang] || keysToAdd[key]['english'];
            });

            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            console.log(`Updated profile keys in ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json`, e);
        }
    }
});
