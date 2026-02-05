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

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inTranslations && line.trim() === 'const translations = {') {
        inTranslations = true;
        outputLines.push(line);
        continue;
    }

    if (inTranslations) {
        if (line.trim() === '};') {
            inTranslations = false;
            outputLines.push(line);
            continue;
        }

        const langMatch = line.match(/^\s{8}"([^"]+)": \{/);
        if (langMatch) {
            capturingLang = langMatch[1];
            currentLangBlock = [line];
            continue;
        }

        if (capturingLang) {
            currentLangBlock.push(line);
            if (line.trim() === '},') {
                if (!seenLanguages.has(capturingLang)) {
                    let blockStr = currentLangBlock.join('\n');
                    if (!blockStr.includes('reportIssue')) {
                        const lastBrace = blockStr.lastIndexOf('}');
                        const entries = Object.entries(reportIssueEntry).map(([k, v]) => `            ${k}: "${v}"`).join(',\n');
                        const inject = `\n            reportIssue: {\n${entries}\n            },`;
                        blockStr = blockStr.substring(0, lastBrace) + inject + blockStr.substring(lastBrace);
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

        if (line.trim() !== '') {
            if (!capturingLang) outputLines.push(line);
        }
    } else {
        outputLines.push(line);
    }
}

fs.writeFileSync(targetFile, outputLines.join('\n'));
console.log(`SUCCESS: De-duplicated to ${seenLanguages.size} unique languages.`);
