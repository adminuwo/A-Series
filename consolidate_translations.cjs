const fs = require('fs');

const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';
const content = fs.readFileSync(targetFile, 'utf8');

// 1. ISOLATE THE TRANSLATIONS OBJECT
const startTag = '    const translations = {';
const startIndex = content.indexOf(startTag);
const tFuncPattern = /\s*const t = \(key\) => \{/;
const tMatch = content.slice(startIndex).match(tFuncPattern);
const endIndex = startIndex + content.slice(startIndex, startIndex + tMatch.index).lastIndexOf('};') + 2;

const translationsCode = content.substring(startIndex, endIndex);

// 2. PARSE INTO LANGUAGES (Robust extraction)
const languagesData = new Map();
const langStarts = [];
const langRegex = /^\s{8}"([^"]+)": \{/gm;
let m;
while ((m = langRegex.exec(translationsCode)) !== null) {
    langStarts.push({
        name: m[1],
        index: m.index
    });
}

for (let i = 0; i < langStarts.length; i++) {
    const start = langStarts[i];
    // Find the end of this block by matching braces
    let depth = 0;
    let inString = false;
    let blockEnd = -1;

    for (let j = start.index; j < translationsCode.length; j++) {
        const char = translationsCode[j];
        if (char === '"') inString = !inString;
        if (!inString) {
            if (char === '{') depth++;
            if (char === '}') depth--;
        }
        if (depth === 0 && j > start.index) {
            blockEnd = j + 1;
            break;
        }
    }

    if (blockEnd !== -1) {
        let blockContent = translationsCode.substring(start.index, blockEnd).trim();
        // Remove the lang key and opening brace to just get the body if we wanted to merge, 
        // but let's just keep the most complete block for now.

        if (!languagesData.has(start.name) || blockContent.length > languagesData.get(start.name).length) {
            languagesData.set(start.name, blockContent);
        }
    }
}

console.log(`Unique languages found: ${languagesData.size}`);

// 3. ENSURE REPORTISSUE IN EACH UNIQUE BLOCK
const reportIssueEntry = {
    title: "Report an Issue",
    subtitle: "Help us improve by reporting bugs or security concerns.",
    typeLabel: "Issue Type",
    bug: "Bug",
    security: "Security",
    other: "Other",
    priorityLabel: "Priority",
    low: "Low - Minor cosmetic issue",
    medium: "Medium - Functionality impacted",
    high: "High - Critical system failure",
    descriptionLabel: "Description",
    descriptionPlaceholder: "Please describe the issue in detail...",
    cancel: "Cancel",
    submit: "Submit Report",
    successTitle: "Report Submitted!",
    successMessage: "Thank you for helping us make A-Series better. We've received your report.",
    close: "Close"
};

const processedLanguages = [];
for (let [lang, code] of languagesData) {
    // If it already contains reportIssue, skip (or we can overwrite to be sure)
    if (!code.includes('reportIssue')) {
        // Find the last closing brace of the language object
        const lastBraceIndex = code.lastIndexOf('}');
        const entries = Object.entries(reportIssueEntry).map(([k, v]) => `            ${k}: "${v}"`).join(',\n');
        const reportIssueCode = `\n        reportIssue: {\n${entries}\n        },`;

        // Inject before the last brace
        code = code.substring(0, lastBraceIndex) + reportIssueCode + code.substring(lastBraceIndex);
    }
    processedLanguages.push('        ' + code + ',');
}

// 4. REASSEMBLE
const rebuiltTranslations = '    const translations = {\n' +
    processedLanguages.join('\n') +
    '\n    };';

const finalFileContent = content.substring(0, startIndex) + rebuiltTranslations + content.substring(endIndex);

fs.writeFileSync(targetFile, finalFileContent);
console.log('CONSOLIDATION COMPLETE!');
