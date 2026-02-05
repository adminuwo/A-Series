const fs = require('fs');
const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';

const extraTranslations = {
    "English": {
        goToASeries: "Go to A-Series"
    },
    "Hindi": {
        goToASeries: "A-Series पर जाएं"
    },
    "Spanish": {
        goToASeries: "Ir a A-Series"
    },
    "French": { goToASeries: "Aller à A-Series" },
    "German": { goToASeries: "Gehe zu A-Series" },
    "Italian": { goToASeries: "Vai a A-Series" },
    "Portuguese": { goToASeries: "Ir para A-Series" },
    "Russian": { goToASeries: "Перейти к A-Series" },
    "Mandarin Chinese": { goToASeries: "前往 A-Series" },
    "Japanese": { goToASeries: "A-Series へ" },
    "Korean": { goToASeries: "A-Series 로 이동" },
    "Arabic": { goToASeries: "الذهاب إلى A-Series" },
    "Turkish": { goToASeries: "A-Series'e Git" },
    "Vietnamese": { goToASeries: "Đến A-Series" },
    "Thai": { goToASeries: "ไปที่ A-Series" },
    "Dutch": { goToASeries: "Ga naar A-Series" },
    "Polish": { goToASeries: "Przejdź do A-Series" },
    "Swedish": { goToASeries: "Gå till A-Series" }
};

// Fallback for others
const languages = [
    "Tamil", "Bengali", "Gujarati", "Marathi", "Telugu", "Kannada", "Malayalam", "Urdu"
];

languages.forEach(lang => {
    extraTranslations[lang] = { goToASeries: "Go to A-Series" };
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

            if (data && data.goToASeries) {
                const indent = '                    '; // 20 spaces
                // Check if admin.sidebar exists
                if (blockStr.includes('sidebar: {')) {
                    blockStr = blockStr.replace(/sidebar: \{([\s\S]+?)\}/, (match, p1) => {
                        let inner = p1.trim();
                        if (!inner.includes('goToASeries:')) {
                            inner += `,\n${indent}    goToASeries: "${data.goToASeries}"`;
                        }
                        return `sidebar: {\n                    ${inner}\n                    }`;
                    });
                }
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
console.log('SUCCESS: Injected goToASeries translation keys for 26 languages.');
