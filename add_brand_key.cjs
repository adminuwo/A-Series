const fs = require('fs');
const path = require('path');

const localesPath = 'e:/A_Series/A-Series/src/locales';

const files = fs.readdirSync(localesPath).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const filePath = path.join(localesPath, file);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Add brandName at the top level
        // We'll put it at the start of the object for visibility
        const newContent = {
            brandName: "A-Series™",
            ...content
        };

        fs.writeFileSync(filePath, JSON.stringify(newContent, null, 4), 'utf8');
        console.log(`Updated ${file}`);
    } catch (e) {
        console.error(`Error processing ${file}:`, e.message);
    }
});
