const fs = require('fs');

const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';
const content = fs.readFileSync(targetFile, 'utf8');

const startTag = 'const translations = {';
const startIndex = content.indexOf(startTag);
const tFuncPattern = /\s*const t = \(key\) => \{/;
const tMatch = content.slice(startIndex).match(tFuncPattern);
const endIndex = startIndex + content.slice(startIndex, startIndex + tMatch.index).lastIndexOf('};') + 2;
const translationsCode = content.substring(startIndex, endIndex);

try {
    const evaluator = new Function(translationsCode + ' return translations;');
    const result = evaluator();
    console.log('SUCCESS: translations object is valid JavaScript!');
} catch (error) {
    console.error('GLOBAL SYNTAX ERROR:', error.message);

    // Check individual language blocks
    const langBlocks = translationsCode.split(/^    "([^"]+)": \{/m);
    for (let i = 1; i < langBlocks.length; i += 2) {
        const langName = langBlocks[i];
        const langContent = '    "' + langName + '": {' + langBlocks[i + 1];

        // Remove trailing comma if it exists in this chunk
        let testCode = 'const translations = {' + langContent;
        if (!testCode.trim().endsWith('}')) {
            // It might end with a comma because of split
            testCode = testCode.replace(/,\s*$/, '') + '};';
        } else {
            testCode += '};';
        }

        try {
            new Function(testCode);
        } catch (langError) {
            console.error(`Error in language: ${langName}`);
            console.error(`Message: ${langError.message}`);
            console.log('--- Start of block ---');
            console.log(langContent.substring(0, 200));
            console.log('--- End of block ---');
            console.log(langContent.substring(langContent.length - 200));

            // Check for reportIssue context
            const reportIdx = langContent.indexOf('"reportIssue":');
            if (reportIdx !== -1) {
                console.log('--- Context around "reportIssue" ---');
                console.log(langContent.substring(reportIdx - 100, reportIdx + 200));
            }
            break;
        }
    }
}
