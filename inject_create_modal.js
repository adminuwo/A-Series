
import fs from 'fs';

const filePath = 'g:\\A_Series\\A-Series\\src\\context\\LanguageContext.jsx';

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Extract English 'agents' block (full) and 'createModal' block (partial)
    // We know roughly where English is.
    const startEnglish = content.indexOf('"English": {');
    const endEnglish = content.indexOf('"Spanish": {');
    const englishBlock = content.substring(startEnglish, endEnglish);

    // Extract createModal block
    const createModalStart = englishBlock.indexOf('createModal: {');
    if (createModalStart === -1) throw new Error("Could not find createModal in English");

    // Find matching brace for createModal
    let braceCount = 0;
    let createModalEnd = -1;
    for (let i = createModalStart; i < englishBlock.length; i++) {
        if (englishBlock[i] === '{') braceCount++;
        else if (englishBlock[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                createModalEnd = i + 1;
                break;
            }
        }
    }
    const createModalBlockStr = englishBlock.substring(createModalStart, createModalEnd);

    // Extract full agents block
    const agentsStart = englishBlock.indexOf('agents: {');
    if (agentsStart === -1) throw new Error("Could not find agents in English");

    braceCount = 0;
    let agentsEnd = -1;
    for (let i = agentsStart; i < englishBlock.length; i++) {
        if (englishBlock[i] === '{') braceCount++;
        else if (englishBlock[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                agentsEnd = i + 1;
                break;
            }
        }
    }
    const agentsBlockStr = englishBlock.substring(agentsStart, agentsEnd);


    // 2. Iterate all languages
    // Function to find languages
    const languageRegex = /"([a-zA-Z ]+)":\s*{/g;
    let match;
    let languages = [];
    const translationsStart = content.indexOf('const translations = {');
    const tStart = content.indexOf('const t = (key)');

    const relevantContent = content.substring(translationsStart, tStart);

    while ((match = languageRegex.exec(relevantContent)) !== null) {
        languages.push({ name: match[1], index: match.index + translationsStart });
    }

    // Process in reverse order so insertions don't mess up indices of previous languages?
    // Actually, indices change after strings are inserted.
    // Easier to split the string by languages and rebuild it? 
    // Or just re-find indices after each operation?
    // Or use a split strategy.

    // Let's use a "process each language" strategy and rebuild the file content buffer.
    // But since we have a huge file, simpler to just replace "Language": { ... } with modified version.

    // Better: Helper function to get block for a language

    // Let's just do naive iteration and string splicing. 
    // We will do it from LAST language to FIRST to avoid index shift issues.
    languages.reverse();

    for (const lang of languages) {
        if (lang.name === 'English') continue;

        // Find the block for this language in the CURRENT content (it might have changed if we processed previous one, but we are going reverse, so indices before current lang are stable? No, indices AFTER current lang are pushed. We are modifying text *inside* the current lang block, which is AT `lang.index`. 
        // If we modify language X (at 5000), language Y (at 2000) is unaffected. 
        // So reverse order is safe.

        // Find end of this language block
        // It ends either at next language start (which was "previous" in our list before reverse) or at end of translations object.
        // Actually, we can just find the matching closing brace for the language.

        let i = lang.index + 1; // skip first brace
        // Find start brace
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

        if (closeBraceIdx === -1) {
            console.error(`Could not find closing brace for ${lang.name}`);
            continue;
        }

        const langContent = content.substring(lang.index, closeBraceIdx + 1);

        // Check for agents block
        const hasAgents = langContent.includes('agents: {');

        if (!hasAgents) {
            // Need to insert agents block.
            // Best place: inside `admin: { ... }`.
            const adminMatch = langContent.match(/admin:\s*{/);
            if (adminMatch) {
                // Find end of admin block
                const adminStartGlobal = lang.index + adminMatch.index;
                let abCount = 0;
                let adminBlockStartIdx = -1;
                // find open brace
                for (let k = adminStartGlobal; k < content.length; k++) {
                    if (content[k] === '{') {
                        adminBlockStartIdx = k;
                        abCount = 1;
                        break;
                    }
                }

                let adminBlockEndIdx = -1;
                for (let k = adminBlockStartIdx + 1; k < content.length; k++) {
                    if (content[k] === '{') abCount++;
                    else if (content[k] === '}') {
                        abCount--;
                        if (abCount === 0) {
                            adminBlockEndIdx = k; // this is the closing }
                            break;
                        }
                    }
                }

                // Insert agents block before the closing brace of admin
                // We'll add a comma too if needed, but usually valid JSON allows extra comma or we assume previous item has comma?
                // JS objects need commas between props. 
                // The item before `}` might not have a comma.
                // Safest: insert `agents: { ... },` at the BEGINNING of admin block?
                // Or check char before `}`.

                // Let's insert at the BEGINNING of admin block (after `{`).
                // `admin: {` -> `admin: {\n${agentsBlockStr},`

                const insertionPoint = adminBlockStartIdx + 1;
                const newContent = content.slice(0, insertionPoint) + '\n' + agentsBlockStr + ',' + content.slice(insertionPoint);
                content = newContent;
                console.log(`Inserted agents block for ${lang.name}`);
            } else {
                console.error(`Could not find admin block for ${lang.name}`);
            }
        } else {
            // Has agents, check createModal
            if (!langContent.includes('createModal: {')) {
                // Insert createModal into agents
                // Find agents block in this language
                const agentsMatch = langContent.match(/agents:\s*{/);
                const agentsStartGlobal = lang.index + agentsMatch.index;

                // insert after `agents: {`
                let openBrace = -1;
                for (let k = agentsStartGlobal; k < content.length; k++) {
                    if (content[k] === '{') {
                        openBrace = k;
                        break;
                    }
                }

                const insertionPoint = openBrace + 1;
                const newContent = content.slice(0, insertionPoint) + '\n' + createModalBlockStr + ',' + content.slice(insertionPoint);
                content = newContent;
                console.log(`Inserted createModal block for ${lang.name}`);
            } else {
                console.log(`Skipping ${lang.name} (already has createModal)`);
            }
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Success: Updated LanguageContext.jsx");

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
