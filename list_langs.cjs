const fs = require('fs');
const content = fs.readFileSync('g:/A_Series/A-Series/src/context/LanguageContext.jsx', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/"([A-Z][a-zA-Z ]+)": \{/);
    if (match) {
        console.log(`${i + 1}: ${match[1]}`);
    }
}
