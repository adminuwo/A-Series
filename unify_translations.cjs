const fs = require('fs');

const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';
const content = fs.readFileSync(targetFile, 'utf8');

// 1. Isolate the translations object
const startTag = '    const translations = {';
const startIndex = content.indexOf(startTag);
const tFuncPattern = /\s*const t = \(key\) => \{/;
const tMatch = content.slice(startIndex).match(tFuncPattern);
const endIndex = startIndex + content.slice(startIndex, startIndex + tMatch.index).lastIndexOf('};') + 2;

const header = content.substring(0, startIndex);
const footer = content.substring(endIndex);
const translationsBody = content.substring(startIndex + startTag.length, endIndex - 2);

// 2. Extract all blocks
const blocks = [];
const langRegex = /^\s{8}"([^"]+)": \{/gm;
let m;
while ((m = langRegex.exec(translationsBody)) !== null) {
    blocks.push({
        name: m[1],
        index: m.index
    });
}

const uniqueLangs = new Map();

for (let i = 0; i < blocks.length; i++) {
    const start = blocks[i];
    let depth = 0;
    let inString = false;
    let blockEnd = -1;

    for (let j = start.index; j < translationsBody.length; j++) {
        const char = translationsBody[j];
        if (char === '"') {
            // Check for escaped quotes
            if (j > 0 && translationsBody[j - 1] !== '\\') {
                inString = !inString;
            }
        }
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
        const rawBody = translationsBody.substring(start.index, blockEnd).trim();
        // If we already have this lang, keep the longer one (usually the more complete one)
        if (!uniqueLangs.has(start.name) || rawBody.length > uniqueLangs.get(start.name).length) {
            uniqueLangs.set(start.name, rawBody);
        }
    }
}

console.log(`De-duplicated from ${blocks.length} to ${uniqueLangs.size} languages.`);

// 3. Ensure reportIssue in each unique block if missing
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

const processedLangs = [];
for (let [name, body] of uniqueLangs) {
    if (!body.includes('reportIssue')) {
        const lastBrace = body.lastIndexOf('}');
        const entries = Object.entries(reportIssueEntry).map(([k, v]) => `            ${k}: "${v}"`).join(',\n');
        const inject = `\n            reportIssue: {\n${entries}\n            },`;
        body = body.substring(0, lastBrace) + inject + body.substring(lastBrace);
    }
    processedLangs.push('        ' + body + ',');
}

// 4. Rebuild file
const newFileContent = header + startTag + '\n' + processedLangs.join('\n') + '\n    };' + footer;

fs.writeFileSync(targetFile, newFileContent);
console.log('SUCCESS: LanguageContext.jsx is now clean and de-duplicated!');
