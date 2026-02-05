
import fs from 'fs';

const filePath = 'g:\\A_Series\\A-Series\\src\\context\\LanguageContext.jsx';

try {
    const content = fs.readFileSync(filePath, 'utf8');

    const startIdx = content.indexOf('const translations = {');
    const endIdx = content.indexOf('const t = (key)');
    const relevantContent = content.substring(startIdx, endIdx);

    const languageRegex = /"([a-zA-Z ]+)":\s*{/g;
    let match;
    let languages = [];

    while ((match = languageRegex.exec(relevantContent)) !== null) {
        languages.push({ name: match[1], index: match.index });
    }

    console.log(`Found ${languages.length} languages.`);

    let missingLanguages = [];

    for (let i = 0; i < languages.length; i++) {
        const lang = languages[i];
        const nextLang = languages[i + 1];
        const langEndIndex = nextLang ? nextLang.index : relevantContent.length;
        const langBlock = relevantContent.substring(lang.index, langEndIndex);

        // Check specifically for createModal inside agents inside admin
        // This is a rough check. If createModal: { exists in the block, we assume it's there.
        // A more robust check would verify nesting, but given the file structure, this is likely sufficient for detection.
        if (!langBlock.includes('createModal: {')) {
            missingLanguages.push(lang.name);
        }
    }

    if (missingLanguages.length > 0) {
        console.log('Languages missing createModal:', missingLanguages.join(', '));
        process.exit(1);
    } else {
        console.log('All languages have createModal block.');
    }

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
