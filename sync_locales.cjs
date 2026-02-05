const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const englishPath = path.join(localesDir, 'english.json');
const english = JSON.parse(fs.readFileSync(englishPath, 'utf8'));

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'english.json');

files.forEach(file => {
    const filePath = path.join(localesDir, file);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        let updatedCount = 0;

        function sync(source, target) {
            for (const key in source) {
                if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    if (!target[key] || typeof target[key] !== 'object') {
                        target[key] = {};
                        updatedCount++;
                    }
                    sync(source[key], target[key]);
                } else {
                    if (target[key] === undefined) {
                        target[key] = source[key];
                        updatedCount++;
                    }
                }
            }
        }

        sync(english, content);

        if (updatedCount > 0) {
            fs.writeFileSync(filePath, JSON.stringify(content, null, 4), 'utf8');
            console.log(`Updated ${file}: ${updatedCount} keys added.`);
        } else {
            console.log(`${file} is already in sync.`);
        }
    } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
    }
});
