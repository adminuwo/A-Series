const fs = require('fs');
const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';

const extraTranslations = {
    "English": {
        newSubscriber: {
            title: "New Subscriber",
            messagePrefix: "New Subscriber: A user has subscribed to"
        }
    },
    "Hindi": {
        newSubscriber: {
            title: "नया सब्सक्राइबर",
            messagePrefix: "नया सब्सक्राइबर: एक उपयोगकर्ता ने सब्सक्राइब किया है"
        }
    },
    "Spanish": {
        newSubscriber: {
            title: "Nuevo Suscriptor",
            messagePrefix: "Nuevo Suscriptor: Un usuario se ha suscrito a"
        }
    }
};

// Fallback for other languages to ensure keys exist (using English values)
const languages = [
    "French", "German", "Arabic", "Mandarin Chinese", "Portuguese", "Russian",
    "Japanese", "Korean", "Tamil", "Bengali", "Gujarati", "Turkish",
    "Marathi", "Telugu", "Kannada", "Malayalam", "Italian", "Dutch",
    "Urdu", "Polish", "Swedish", "Vietnamese", "Thai"
];

languages.forEach(lang => {
    extraTranslations[lang] = extraTranslations["English"];
});

const content = fs.readFileSync(targetFile, 'utf8');
const lines = content.replace(/\r/g, '').split('\n');

let outputLines = [];
let inTranslations = false;
let capturingLang = null;
let braceDepth = 0;
let currentLangBlock = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inTranslations) {
        if (line.trim() === 'const translations = {') {
            inTranslations = true;
            outputLines.push(line);
            continue;
        }
        outputLines.push(line);
        continue;
    }

    if (braceDepth === 0 && line.trim() === '};') {
        inTranslations = false;
        outputLines.push(line);
        continue;
    }

    const langMatch = line.match(/^\s{8}"([^"]+)": \{/);
    if (braceDepth === 0 && langMatch) {
        capturingLang = langMatch[1];
        currentLangBlock = [line];
        braceDepth = 1;
        continue;
    }

    if (capturingLang) {
        currentLangBlock.push(line);

        let inString = false;
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                if (j === 0 || line[j - 1] !== '\\') inString = !inString;
            }
            if (!inString) {
                if (char === '{') braceDepth++;
                if (char === '}') braceDepth--;
            }
        }

        if (braceDepth === 0) {
            let blockStr = currentLangBlock.join('\n');
            const data = extraTranslations[capturingLang];

            if (data) {
                const indent = '                        ';
                const newSubscriberStr = `newSubscriber: ${JSON.stringify(data.newSubscriber, null, 4).replace(/\n/g, '\n' + indent)}`;

                // Update notificationsPage to include new keys if not present
                blockStr = blockStr.replace(/notificationsPage: \{([\s\S]+?)\}/, (match, p1) => {
                    let inner = p1.trim();
                    if (!inner.includes('newSubscriber:')) {
                        inner += `,\n${indent}${newSubscriberStr}`;
                    }
                    return `notificationsPage: {\n                        ${inner}\n                    }`;
                });
            }

            outputLines.push(blockStr);
            capturingLang = null;
            currentLangBlock = [];
        }
        continue;
    }
    if (line.trim() !== '') outputLines.push(line);
}

fs.writeFileSync(targetFile, outputLines.join('\n'));
console.log('SUCCESS: Injected subscriber translation keys for 26 languages.');
