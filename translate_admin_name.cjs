const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const translations = {
    "hindi": { "adminName": "प्रशासक" },
    "bengali": { "adminName": "প্রশাসক" },
    "marathi": { "adminName": "प्रशासक" },
    "gujarati": { "adminName": "એડમિન" }, // Common used term
    "tamil": { "adminName": "நிர்வாகி" },
    "telugu": { "adminName": "నిర్వాహకుడు" },
    "arabic": { "adminName": "مشرف" },
    "french": { "adminName": "Administrateur" },
    "spanish": { "adminName": "Administrador" },
    "english": { "adminName": "Admin" }
};

Object.keys(translations).forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const tx = translations[lang];

            Object.assign(content, tx);

            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            console.log(`Updated adminName in ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json`, e);
        }
    }
});
