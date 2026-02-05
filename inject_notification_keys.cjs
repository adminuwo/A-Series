const fs = require('fs');
const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';

const extraTranslations = {
    "English": {
        systemMaintenance: { title: "System Maintenance", message: "The system is currently in maintenance mode." },
        systemRestored: { title: "System Restored", message: "Maintenance is complete. System is fully operational." },
        criticalAlert: { title: "Critical Alert", message: "Global Kill-Switch Activated. All AI services are momentarily suspended." },
        servicesRestored: { title: "Services Restored", message: "Global Kill-Switch Deactivated. All AI services are now active." },
        newAnnouncement: "New Announcement",
        markRead: "Mark as Read",
        delete: "Delete"
    },
    // Adding basics for others to prevent crashes, in a real scenario we'd translate these properly.
    // Reusing English for placeholders where I don't have perfect translations to ensure keys exist.
    "Hindi": {
        systemMaintenance: { title: "सिस्टम रखरखाव", message: "सिस्टम वर्तमान में रखरखाव मोड में है।" },
        systemRestored: { title: "सिस्टम बहाल", message: "रखरखाव पूरा हो गया है। सिस्टम पूरी तरह से चालू है।" },
        criticalAlert: { title: "महत्वपूर्ण चेतावनी", message: "ग्लोबल किल-स्विच सक्रिय। सभी एआई सेवाएं क्षणिक रूप से निलंबित हैं।" },
        servicesRestored: { title: "सेवाएं बहाल", message: "ग्लोबल किल-स्विच निष्क्रिय। सभी एआई सेवाएं अब सक्रिय हैं।" },
        newAnnouncement: "नई घोषणा",
        markRead: "पढ़ा हुआ चिह्नित करें",
        delete: "हटाएं"
    },
    "Spanish": {
        systemMaintenance: { title: "Mantenimiento del Sistema", message: "El sistema está actualmente en modo de mantenimiento." },
        systemRestored: { title: "Sistema Restaurado", message: "Mantenimiento completado. El sistema está totalmente operativo." },
        criticalAlert: { title: "Alerta Crítica", message: "Interruptor de Apagado Global Activado. Todos los servicios de IA están suspendidos momentáneamente." },
        servicesRestored: { title: "Servicios Restaurados", message: "Interruptor de Apagado Global Desactivado. Todos los servicios de IA están activos ahora." },
        newAnnouncement: "Nuevo Anuncio",
        markRead: "Marcar como leído",
        delete: "Eliminar"
    }
};

// Fallback for other languages to ensure keys exist (using English values)
const languages = [
    "French", "German", "Arabic", "Mandarin Chinese", "Portuguese", "Russian",
    "Japanese", "Korean", "Tamil", "Bengali", "Gujarati", "Turkish",
    "Marathi", "Telugu", "Kannada", "Malayalam", "Italian", "Dutch",
    "Urdu", "Polish", "Swedish", "Vietnamese", "Thai"
];

languages.forEach(lang => {
    extraTranslations[lang] = extraTranslations["English"];
});

const content = fs.readFileSync(targetFile, 'utf8');
const lines = content.replace(/\r/g, '').split('\n');

let outputLines = [];
let inTranslations = false;
let capturingLang = null;
let braceDepth = 0;
let currentLangBlock = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inTranslations) {
        if (line.trim() === 'const translations = {') {
            inTranslations = true;
            outputLines.push(line);
            continue;
        }
        outputLines.push(line);
        continue;
    }

    if (braceDepth === 0 && line.trim() === '};') {
        inTranslations = false;
        outputLines.push(line);
        continue;
    }

    const langMatch = line.match(/^\s{8}"([^"]+)": \{/);
    if (braceDepth === 0 && langMatch) {
        capturingLang = langMatch[1];
        currentLangBlock = [line];
        braceDepth = 1;
        continue;
    }

    if (capturingLang) {
        currentLangBlock.push(line);

        let inString = false;
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                if (j === 0 || line[j - 1] !== '\\') inString = !inString;
            }
            if (!inString) {
                if (char === '{') braceDepth++;
                if (char === '}') braceDepth--;
            }
        }

        if (braceDepth === 0) {
            let blockStr = currentLangBlock.join('\n');
            const data = extraTranslations[capturingLang];

            if (data) {
                // Determine indentation
                const indent = '                        '; // 24 spaces based on file structure

                // Prepare replacement strings
                const systemMaintenanceStr = `systemMaintenance: ${JSON.stringify(data.systemMaintenance, null, 4).replace(/\n/g, '\n' + indent)}`;
                const systemRestoredStr = `systemRestored: ${JSON.stringify(data.systemRestored, null, 4).replace(/\n/g, '\n' + indent)}`;
                const criticalAlertStr = `criticalAlert: ${JSON.stringify(data.criticalAlert, null, 4).replace(/\n/g, '\n' + indent)}`;
                const servicesRestoredStr = `servicesRestored: ${JSON.stringify(data.servicesRestored, null, 4).replace(/\n/g, '\n' + indent)}`;

                // Update notificationsPage to include new keys
                blockStr = blockStr.replace(/notificationsPage: \{([\s\S]+?)\}/, (match, p1) => {
                    let inner = p1.trim();
                    if (!inner.includes('systemMaintenance:')) {
                        inner += `,\n${indent}${systemMaintenanceStr},\n${indent}${systemRestoredStr},\n${indent}${criticalAlertStr},\n${indent}${servicesRestoredStr},\n${indent}newAnnouncement: "${data.newAnnouncement}"`;
                    }
                    // Ensure markRead and delete are there if missing (some langs might have them, some might not)
                    if (!inner.includes('markRead:')) {
                        inner += `,\n${indent}markRead: "${data.markRead}"`;
                    }
                    if (!inner.includes('delete:') && !inner.includes('"delete":')) {
                        inner += `,\n${indent}delete: "${data.delete}"`;
                    }

                    return `notificationsPage: {\n                        ${inner}\n                    }`;
                });
            }

            outputLines.push(blockStr);
            capturingLang = null;
            currentLangBlock = [];
        }
        continue;
    }
    if (line.trim() !== '') outputLines.push(line);
}

fs.writeFileSync(targetFile, outputLines.join('\n'));
console.log('SUCCESS: Injected notification translations for 26 languages.');
