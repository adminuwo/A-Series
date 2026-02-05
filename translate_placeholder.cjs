const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const translations = {
    "hindi": { "placeholder": "आइसा से पूछें..." },
    "bengali": { "placeholder": "আইসাকে জিজ্ঞাসা করুন..." },
    "marathi": { "placeholder": "आइसाला विचारा..." },
    "gujarati": { "placeholder": "આઈસાને પૂછો..." },
    "tamil": { "placeholder": "ஐசாவிடம் கேளுங்கள்..." },
    "telugu": { "placeholder": "ఐసాను అడగండి..." },
    "arabic": { "placeholder": "اسأل آيسا..." },
    "english": { "placeholder": "Ask AISA..." },
    "french": { "placeholder": "Demandez à AISA..." },
    "spanish": { "placeholder": "Pregunta a AISA..." }
};

Object.keys(translations).forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const tx = translations[lang];

            // Navigate to chatPage.inputPlaceholder
            if (!content.chatPage) content.chatPage = {};
            content.chatPage.inputPlaceholder = tx.placeholder;

            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            console.log(`Updated placeholder in ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json`, e);
        }
    }
});
