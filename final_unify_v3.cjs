const fs = require('fs');

const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';
const content = fs.readFileSync(targetFile, 'utf8');
const lines = content.replace(/\r/g, '').split('\n');

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

let inTranslations = false;
let seenLanguages = new Set();
let outputLines = [];
let currentLangBlock = [];
let capturingLang = null;
let braceDepth = 0;

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

    // Inside translations
    if (braceDepth === 0 && line.trim() === '};') {
        inTranslations = false;
        outputLines.push(line);
        continue;
    }

    // Attempt to match language start ONLY if depth is 0
    const langMatch = line.match(/^\s{8}"([^"]+)": \{/);
    if (braceDepth === 0 && langMatch) {
        capturingLang = langMatch[1];
        currentLangBlock = [line];
        braceDepth = 1;
        continue;
    }

    if (capturingLang) {
        currentLangBlock.push(line);

        // Track braces in the current line
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

        // If depth returns to 0, we finished the language block
        if (braceDepth === 0) {
            if (!seenLanguages.has(capturingLang)) {
                let blockStr = currentLangBlock.join('\n');

                // Inject reportIssue if missing
                if (!blockStr.includes('reportIssue')) {
                    // Find the last brace (the one that closed the language)
                    const lastBraceIndex = blockStr.lastIndexOf('}');
                    const entries = Object.entries(reportIssueEntry).map(([k, v]) => `            ${k}: "${v}"`).join(',\n');
                    const inject = `\n            reportIssue: {\n${entries}\n            },`;
                    blockStr = blockStr.substring(0, lastBraceIndex) + inject + blockStr.substring(lastBraceIndex);
                }

                outputLines.push(blockStr);
                seenLanguages.add(capturingLang);
            } else {
                console.log(`Skipping duplicate language: ${capturingLang}`);
            }
            capturingLang = null;
            currentLangBlock = [];
        }
        continue;
    }

    // Stray lines between blocks
    if (line.trim() !== '') {
        outputLines.push(line);
    }
}

fs.writeFileSync(targetFile, outputLines.join('\n'));
console.log(`SUCCESS: De-duplicated to ${seenLanguages.size} unique languages.`);
