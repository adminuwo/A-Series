const fs = require('fs');

const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';
let content = fs.readFileSync(targetFile, 'utf8');

const reportIssueBlocks = {
    "English": {
        title: "Report an Issue",
        subtitle: "Help us improve by reporting bugs or security concerns.",
        typeLabel: "Issue Type",
        bug: "Bug",
        security: "Security",
        other: "Other",
        priorityLabel: "Priority",
        low: "Low - Minor cosmetic issue",
        medium: "Medium - Functionality impacted",
        high: "High - Critical system failure",
        descriptionLabel: "Description",
        descriptionPlaceholder: "Please describe the issue in detail...",
        cancel: "Cancel",
        submit: "Submit Report",
        successTitle: "Report Submitted!",
        successMessage: "Thank you for helping us make A-Series better. We've received your report.",
        close: "Close"
    },
    "Hindi": {
        title: "एक समस्या की रिपोर्ट करें",
        subtitle: "बग या सुरक्षा चि่ताओं की रिपोर्ट करके हमें बेहतर बनाने में मदद करें।",
        typeLabel: "समस्या का प्रकार",
        bug: "बग",
        security: "सुरक्षा",
        other: "अन्य",
        priorityLabel: "प्राथमिकता",
        low: "कम - मामूली कॉस्मेटिक समस्या",
        medium: "मध्यम - कार्यक्षमता प्रभावित",
        high: "उच्च - महत्वपूर्ण सिस्टम विफलता",
        descriptionLabel: "विवरण",
        descriptionPlaceholder: "कृपया समस्या का विस्तार से वर्णन करें...",
        cancel: "रद्द करें",
        submit: "रिपोर्ट सबमिट करें",
        successTitle: "रिपोर्ट सबमिट की गई!",
        successMessage: "A-Series को बेहतर बनाने में हमारी मदद करने के लिए धन्यवाद। हमें आपकी रिपोर्ट मिल गई है।",
        close: "बंद करें"
    },
    "Thai": {
        title: "รายงานปัญหา",
        subtitle: "ช่วยเราปรับปรุงโดยการรายงานข้อบกพร่องหรือข้อกังวลด้านความปลอดภัย",
        typeLabel: "ประเภทของปัญหา",
        bug: "ข้อบกพร่อง (Bug)",
        security: "ความปลอดภัย",
        other: "อื่นๆ",
        priorityLabel: "ความสำคัญ",
        low: "ต่ำ - ปัญหาความสวยงามเล็กน้อย",
        medium: "ปานกลาง - กระทบต่อการใช้งาน",
        high: "สูง - ระบบขัดข้องขั้นรุนแรง",
        descriptionLabel: "รายละเอียด",
        descriptionPlaceholder: "กรุณาอธิบายปัญหาโดยละเอียด...",
        cancel: "ยกเลิก",
        submit: "ส่งรายงาน",
        successTitle: "ส่งรายงานสำเร็จแล้ว!",
        successMessage: "ขอบคุณที่ช่วยให้ A-Series ดีขึ้น เราได้รับรายงานของคุณแล้ว",
        close: "ปิด"
    },
    "Spanish": {
        title: "Informar un Problema",
        subtitle: "Ayúdenos a mejorar informando errores o problemas de seguridad.",
        typeLabel: "Tipo de Problema",
        bug: "Error",
        security: "Seguridad",
        other: "Otro",
        priorityLabel: "Prioridad",
        low: "Baja - Problema estético menor",
        medium: "Media - Funcionalidad afectada",
        high: "Alta - Fallo crítico del sistema",
        descriptionLabel: "Descripción",
        descriptionPlaceholder: "Describa el problema en detalle...",
        cancel: "Cancelar",
        submit: "Enviar Informe",
        successTitle: "¡Informe Enviado!",
        successMessage: "Gracias por ayudarnos a mejorar A-Series. Hemos recibido su informe.",
        close: "Cerrar"
    },
    "French": {
        title: "Signaler un Problème",
        subtitle: "Aidez-nous à nous améliorer en signalant des bogues ou des problèmes de sécurité.",
        typeLabel: "Type de Problème",
        bug: "Bogue",
        security: "Sécurité",
        other: "Autre",
        priorityLabel: "Priorité",
        low: "Basse - Problème cosmétique mineur",
        medium: "Moyenne - Fonctionnalité affectée",
        high: "Haute - Défaillance critique du système",
        descriptionLabel: "Description",
        descriptionPlaceholder: "Veuillez décrire le problème en détail...",
        cancel: "Annuler",
        submit: "Envoyer le Rapport",
        successTitle: "Rapport Envoyé !",
        successMessage: "Merci de nous aider à améliorer A-Series. Nous avons bien reçu votre rapport.",
        close: "Fermer"
    }
};

const lines = content.split('\n');
let newLines = [];
let currentLang = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect language change
    // Matches:         "English": {
    const langMatch = line.match(/^        "([A-Z][a-zA-Z ]+)": \{/);
    if (langMatch) {
        currentLang = langMatch[1];
    }

    // Detect if we are at the end of a language block
    // Matches precisely:         },
    if (currentLang && line.match(/^        \},$/)) {
        const block = reportIssueBlocks[currentLang] || reportIssueBlocks["English"];

        // Construct the block string with correct indentation (12 spaces for keys)
        const entries = Object.entries(block).map(([k, v]) => `                ${k}: "${v}"`).join(',\n');
        const blockString = `            reportIssue: {\n${entries}\n            },`;

        newLines.push(blockString);
        currentLang = null; // Reset until next language start
    }

    newLines.push(line);
}

fs.writeFileSync(targetFile, newLines.join('\n'));
console.log('Precise injection complete!');
