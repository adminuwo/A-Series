const fs = require('fs');

const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';
let content = fs.readFileSync(targetFile, 'utf8');

const startTag = 'const translations = {';
const startIndex = content.indexOf(startTag);
const tFuncPattern = /\s*const t = \(key\) => \{/;
const tMatch = content.slice(startIndex).match(tFuncPattern);
const endIndex = startIndex + content.slice(startIndex, startIndex + tMatch.index).lastIndexOf('};') + 2;

let translationsBody = content.substring(startIndex, endIndex);

// 1. ADD COMMAS EVERYWHERE (Aggressive)
// Add comma after every quoted value ending a line
translationsBody = translationsBody.replace(/(")\s*(\r?\n)/g, '",$2');
// Add comma after every closing brace ending a line
translationsBody = translationsBody.replace(/(\})\s*(\r?\n)/g, '},$2');
// Add comma after every closing bracket ending a line
translationsBody = translationsBody.replace(/(\])\s*(\r?\n)/g, '],$2');

// 2. CLEANUP
// Deduplicate commas
translationsBody = translationsBody.replace(/,+/g, ',');
// Remove illegal commas after opening symbols
translationsBody = translationsBody.replace(/\{\s*,/g, '{');
translationsBody = translationsBody.replace(/\[\s*,/g, '[');

// 3. FIX REPORTISSUE QUOTING
translationsBody = translationsBody.replace(/reportIssue:\s*\{/g, '"reportIssue": {');

// 4. FIX INTERPOLATION CORRUPTION (REVERSE {name, })
translationsBody = translationsBody.replace(/\{([a-zA-Z0-9]+)\s*,\s*\}/g, '{$1}');

// 5. Final check: the very last closing brace of the whole object should NOT have a comma followed by anything but whitespace/end
// But trailing commas are okay in JS objects, so we are fine.

const newFileContent = content.substring(0, startIndex) + translationsBody + content.substring(endIndex);
fs.writeFileSync(targetFile, newFileContent);
console.log('Aggressive normalization complete!');
