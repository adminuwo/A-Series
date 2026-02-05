const fs = require('fs');

const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';
const content = fs.readFileSync(targetFile, 'utf8');

const startTag = 'const translations = {';
const startIndex = content.indexOf(startTag);
const tFuncPattern = /\s*const t = \(key\) => \{/;
const tMatch = content.slice(startIndex).match(tFuncPattern);
const endIndex = startIndex + content.slice(startIndex, startIndex + tMatch.index).lastIndexOf('};') + 2;

const translationsCode = content.substring(startIndex, endIndex);

// Write to a standalone file for debugging
fs.writeFileSync('g:/A_Series/A-Series/temp_translations.cjs', 'module.exports = ' + translationsCode.replace('const translations =', '') + ';');

try {
    require('./temp_translations.cjs');
    console.log('SUCCESS: temp_translations.cjs is valid!');
} catch (error) {
    console.error('FULL ERROR STACK:');
    console.error(error.stack);
}
