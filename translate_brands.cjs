const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const replacements = {
    "hindi": { "A-Series": "ए-सीरीज", "UWO": "यूवो" },
    "marathi": { "A-Series": "ए-सीरीज", "UWO": "यूवो" },
    "bengali": { "A-Series": "এ-সিরিজ", "UWO": "ইউও" }, // Uwo
    "gujarati": { "A-Series": "એ-સિરીઝ", "UWO": "યુવો" },
    "tamil": { "A-Series": "ஏ-சீரிஸ்", "UWO": "யுவோ" },
    "telugu": { "A-Series": "ఏ-సిరీస్", "UWO": "యువో" },
    "arabic": { "A-Series": "آي-سيريز", "UWO": "يو دبليو أو" }, // U W O
    // Leaving French/Spanish/English as is (Standard Latin)
};

Object.keys(replacements).forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            let contentStr = fs.readFileSync(filePath, 'utf8');
            const map = replacements[lang];

            // Perform global replacements
            // We use a regex to ensure we capture the TM symbol if immediate or just the text
            // But usually string replacement is safer on the whole file content for these specific unique signals.

            // Replace A-Series
            contentStr = contentStr.replace(/A-Series/g, map["A-Series"]);

            // Replace UWO
            contentStr = contentStr.replace(/UWO/g, map["UWO"]);

            fs.writeFileSync(filePath, contentStr);
            console.log(`Transliterated brands in ${lang}.json`);
        } catch (e) {
            console.error(`Error processing ${lang}.json`, e);
        }
    }
});
