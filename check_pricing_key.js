import fs from 'fs';

const filePath = 'g:\\A_Series\\A-Series\\src\\context\\LanguageContext.jsx';

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Find all language blocks
    const languageRegex = /"([a-zA-Z ]+)":\s*{/g;
    let match;
    let languages = [];

    const translationsStart = content.indexOf('const translations = {');
    const tStart = content.indexOf('const t = (key)');
    const relevantContent = content.substring(translationsStart, tStart);

    while ((match = languageRegex.exec(relevantContent)) !== null) {
        languages.push({ name: match[1], index: match.index + translationsStart });
    }

    console.log(`Found ${languages.length} languages`);

    // Check each language for missing pricing key in createModal
    for (const lang of languages) {
        // Find the end of this language block
        let i = lang.index + 1;
        while (content[i] !== '{') i++;

        const openBraceIdx = i;
        let bCount = 1;
        let closeBraceIdx = -1;

        for (let j = openBraceIdx + 1; j < content.length; j++) {
            if (content[j] === '{') bCount++;
            else if (content[j] === '}') {
                bCount--;
                if (bCount === 0) {
                    closeBraceIdx = j;
                    break;
                }
            }
        }

        const langContent = content.substring(lang.index, closeBraceIdx + 1);

        // Check if createModal exists
        if (langContent.includes('createModal: {')) {
            // Check if pricing key exists in createModal
            const createModalMatch = langContent.match(/createModal:\s*{([^}]+({[^}]*}[^}]*)*[^}]*)}/s);
            if (createModalMatch) {
                const createModalContent = createModalMatch[1];
                if (!createModalContent.includes('pricing:')) {
                    console.log(`${lang.name}: Missing 'pricing' key in createModal`);
                }
            }
        }
    }

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
