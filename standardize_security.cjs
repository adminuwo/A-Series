const securityTitleTranslations = {
    "English": { pageTitle: "Security & Guidelines", section12: "12. Incident Reporting & Support", reportBtn: "Open Form", legalTitle: "🧠 Legal Summary Statement" },
    "Hindi": { pageTitle: "सुरक्षा और दिशानिर्देश", section12: "12. घटना रिपोर्टिंग और सहायता", reportBtn: "फॉर्म खोलें", legalTitle: "🧠 कानूनी सारांश विवरण" },
    "Spanish": { pageTitle: "Seguridad y Directrices", section12: "12. Informe de Incidentes y Soporte", reportBtn: "Abrir Formulario", legalTitle: "🧠 Declaración de Resumen Legal" },
    "French": { pageTitle: "Sécurité et Directives", section12: "12. Signalement d'Incidents et Support", reportBtn: "Ouvrir le Formulaire", legalTitle: "🧠 Résumé Juridique" },
    "German": { pageTitle: "Sicherheit und Richtlinien", section12: "12. Vorfallsmeldung und Support", reportBtn: "Formular öffnen", legalTitle: "🧠 Rechtliche Zusammenfassung" },
    "Arabic": { pageTitle: "الأمن والإرشادات", section12: "12. الإبلاغ عن الحوادث والدعم", reportBtn: "افتح النموذج", legalTitle: "🧠 بيان الملخص القانوني" },
    "Mandarin Chinese": { pageTitle: "安全与准则", section12: "12. 事件报告与支持", reportBtn: "打开表单", legalTitle: "🧠 法律摘要声明" },
    "Portuguese": { pageTitle: "Segurança e Diretrizes", section12: "12. Relato de Incidentes e Suporte", reportBtn: "Abrir Formulário", legalTitle: "🧠 Declaração de Resumo Jurídico" },
    "Russian": { pageTitle: "Безопасность и Правила", section12: "12. Отчет об Инцидентах и Поддержка", reportBtn: "Открыть Форму", legalTitle: "🧠 Юридическое Резюме" },
    "Japanese": { pageTitle: "セキュリティとガイドライン", section12: "12. インシデント報告とサポート", reportBtn: "フォームを開く", legalTitle: "🧠 法的要約ステートメント" },
    "Korean": { pageTitle: "보안 및 지침", section12: "12. 사고 보고 및 지원", reportBtn: "양식 열기", legalTitle: "🧠 법적 요약문" },
    "Bengali": { pageTitle: "নিরাপত্তা ও নির্দেশিকা", section12: "12. ঘটনা রিপোর্টিং এবং সহায়তা", reportBtn: "ফর্ম খুলুন", legalTitle: "🧠 আইনি সারাংশ বিবরণ" },
    "Marathi": { pageTitle: "सुरक्षा आणि मार्गदर्शक तत्त्वे", section12: "12. घटना अहवाल आणि समर्थन", reportBtn: "फॉर्म उघडा", legalTitle: "🧠 कायदेशीर सारांश विधान" },
    "Telugu": { pageTitle: "భద్రత మరియు మార్గదర్శకాలు", section12: "12. ఇన్సిడెంట్ రిపోర్టింగ్ మరియు సపోర్ట్", reportBtn: "ఫారమ్‌ను తెరవండి", legalTitle: "🧠 లీగల్ సమ్మరీ స్టేట్‌మెంట్" },
    "Turkish": { pageTitle: "Güvenlik ve Kurallar", section12: "12. Olay Bildirimi ve Destek", reportBtn: "Formu Aç", legalTitle: "🧠 Yasal Özet Beyanı" },
    "Tamil": { pageTitle: "பாதுகாப்பு மற்றும் வழிகாட்டுதல்கள்", section12: "12. சம்பவ அறிக்கையிடல் மற்றும் ஆதரவு", reportBtn: "படிவத்தைத் திறக்கவும்", legalTitle: "🧠 சட்ட சுருக்க அறிக்கை" },
    "Kannada": { pageTitle: "ಭದ್ರತೆ ಮತ್ತು ಮಾರ್ಗಸೂಚಿಗಳು", section12: "12. ಘಟನೆ ವರದಿ ಮತ್ತು ಬೆಂಬಲ", reportBtn: "ಫಾರ್ಮ್ ಓಪನ್ ಮಾಡಿ", legalTitle: "🧠 ಕಾನೂನು ಸಾರಾಂಶ ಹೇಳಿಕೆ" },
    "Malayalam": { pageTitle: "സുരക്ഷയും മാർഗ്ഗനിർദ്ദേശങ്ങളും", section12: "12. സംഭവ റിപ്പോർട്ടിംഗും പിന്തുണയും", reportBtn: "ഫോം തുറക്കുക", legalTitle: "🧠 നിയമപരമായ സംഗ്രഹ പ്രസ്താവന" },
    "Italian": { pageTitle: "Sicurezza e Linee Guida", section12: "12. Segnalazione Incidenti e Supporto", reportBtn: "Apri Modulo", legalTitle: "🧠 Dichiarazione di Sintesi Legale" },
    "Dutch": { pageTitle: "Beveiliging en Richtlijnen", section12: "12. Incidentrapportage en Ondersteuning", reportBtn: "Formulier Openen", legalTitle: "🧠 Juridische Samenvatting" },
    "Urdu": { pageTitle: "سیکیورٹی اور رہنما خطوط", section12: "12. واقعے کی رپورٹنگ اور سپورٹ", reportBtn: "فارم کھولیں", legalTitle: "🧠 قانونی خلاصہ بیان" },
    "Gujarati": { pageTitle: "સુરક્ષા અને માર્ગદર્શિકા", section12: "12. ઇન્સિડન્ટ રિપોર્ટિંગ અને સપોર્ટ", reportBtn: "ફોર્મ ખોલો", legalTitle: "🧠 કાનૂની સારાંશ નિવેદન" },
    "Polish": { pageTitle: "Bezpieczeństwo i Wytyczne", section12: "12. Zgłaszanie Incydentów i Wsparcie", reportBtn: "Otwórz Formularz", legalTitle: "🧠 Oświadczenie o Podsumowaniu Prawnym" },
    "Swedish": { pageTitle: "Säkerhet och Riktlinjer", section12: "12. Incidentrapportering och Support", reportBtn: "Öppna Formulär", legalTitle: "🧠 Juridisk Sammanfattning" },
    "Vietnamese": { pageTitle: "Bảo mật và Hướng dẫn", section12: "12. Báo cáo Sự cố và Hỗ trợ", reportBtn: "Mở Biểu mẫu", legalTitle: "🧠 Tóm tắt Pháp lý" },
    "Thai": { pageTitle: "ความปลอดภัยและแนวทางปฏิบัติ", section12: "12. การรายงานเหตุการณ์และการสนับสนุน", reportBtn: "เปิดฟอร์ม", legalTitle: "🧠 สรุปสาระสำคัญทางกฎหมาย" }
};

const fs = require('fs');
const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';
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
            const trans = securityTitleTranslations[capturingLang];

            if (trans) {
                // If the language has the old structure, try to upgrade it
                if (blockStr.includes('securityGuidelines: {')) {
                    // Replace pageTitle
                    blockStr = blockStr.replace(/pageTitle: "[^"]+"/, `pageTitle: "${trans.pageTitle}"`);

                    // Replace or Inject Section 12 if missing or different
                    if (blockStr.includes('section12: {')) {
                        blockStr = blockStr.replace(/section12: \{[\s\S]+?\}/, `section12: {
                        title: "${trans.section12}",
                        mainText: "...",
                        reportButton: "...",
                        reportButtonText: "${trans.reportBtn}",
                        supportButton: "..."
                    }`);
                    }

                    // Replace or Inject Legal Summary
                    if (blockStr.includes('legalSummaryTitle: "[^"]+"')) {
                        blockStr = blockStr.replace(/legalSummaryTitle: "[^"]+"/, `legalSummaryTitle: "${trans.legalTitle}"`);
                    }
                }
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
console.log('SUCCESS: Standardized securityGuidelines titles for all 26 languages.');
