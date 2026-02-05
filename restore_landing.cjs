const fs = require('fs');
const path = require('path');

const localesPath = 'e:/A_Series/A-Series/src/locales';
const backupPath = 'e:/A_Series/A-Series/src/context/LanguageContext.jsx.bak';

// Load the backup file to extract original translations
const backupContent = fs.readFileSync(backupPath, 'utf8');

// Helper to extract a language object from the massive backup file
function extractLanguage(content, langName) {
    // This is tricky because the backup file is a JS file with a huge object
    // We'll search for "langName": { and try to find the match
    const startMarker = `"${langName}": {`;
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return null;

    let braceCount = 1;
    let i = startIndex + startMarker.length;
    while (braceCount > 0 && i < content.length) {
        if (content[i] === '{') braceCount++;
        else if (content[i] === '}') braceCount--;
        i++;
    }

    const rawObject = content.substring(startIndex + startMarker.length - 1, i);
    // Cleanup trailing commas and property names to make it valid JSON if possible, 
    // but it might be easier to just regex extract the landing section.
    return rawObject;
}

// Map of JSON filename to the language key in the backup if different
const langMap = {
    'english.json': 'English',
    'hindi.json': 'Hindi',
    'spanish.json': 'Spanish',
    'french.json': 'French',
    'german.json': 'German',
    'arabic.json': 'Arabic',
    'mandarin_chinese.json': 'Mandarin Chinese',
    'portuguese.json': 'Portuguese',
    'russian.json': 'Russian',
    'japanese.json': 'Japanese',
    'korean.json': 'Korean',
    'tamil.json': 'Tamil',
    'bengali.json': 'Bengali',
    'gujarati.json': 'Gujarati',
    'turkish.json': 'Turkish',
    'telugu.json': 'Telugu',
    'marathi.json': 'Marathi',
    'kannada.json': 'Kannada',
    'malayalam.json': 'Malayalam',
    'punjabi.json': 'Punjabi',
    'urdu.json': 'Urdu',
    'vietnamese.json': 'Vietnamese',
    'thai.json': 'Thai',
    'swedish.json': 'Swedish',
    'dutch.json': 'Dutch',
    'polish.json': 'Polish',
    'italian.json': 'Italian'
};

const files = fs.readdirSync(localesPath).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const filePath = path.join(localesPath, file);
    const langKey = langMap[file];

    if (!langKey) {
        console.log(`Skipping ${file}, no mapping found.`);
        return;
    }

    const rawLangObj = extractLanguage(backupContent, langKey);
    if (!rawLangObj) {
        console.log(`Could not find translations for ${langKey} in backup.`);
        return;
    }

    // Extract the landing section using regex from the raw string
    // We want specifically the landing: { ... } part
    const landingMatch = rawLangObj.match(/landing\s*:\s*{([\s\S]*?^(\s*)})/m);
    if (!landingMatch) {
        console.log(`Could not find landing section for ${langKey}.`);
        return;
    }

    // Convert the JS-style object string to JSON-ish
    let landingStr = landingMatch[0];
    landingStr = landingStr.replace(/(\w+)\s*:/g, '"$1":'); // Quote properties
    landingStr = landingStr.replace(/'/g, '"'); // Single to double quotes
    landingStr = landingStr.replace(/,\s*}/g, '}'); // Remove trailing commas

    // Some lines might have A-Series or UWO without trademarks, let's add them back correctly
    landingStr = landingStr.replace(/A-Series/g, 'A-Series™');
    landingStr = landingStr.replace(/UWO(?!™)/g, 'UWO™');
    landingStr = landingStr.replace(/™™/g, '™');

    try {
        const landingJson = JSON.parse('{' + landingStr + '}').landing;

        // Read the current file
        const currentContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Update the landing section
        currentContent.landing = {
            ...currentContent.landing, // Keep keys that might be new
            ...landingJson
        };

        fs.writeFileSync(filePath, JSON.stringify(currentContent, null, 4), 'utf8');
        console.log(`Restored landing page for ${file}`);
    } catch (e) {
        console.error(`Error processing ${file}:`, e.message);
    }
});
