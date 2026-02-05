const fs = require('fs');
const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';

const localizedData = {
    "English": {
        report: { title: "Report an Issue", subtitle: "Help us improve by reporting bugs or security concerns.", bug: "Bug", security: "Security", other: "Other", submit: "Submit Report", close: "Close" },
        security: { pageTitle: "Security & Guidelines", s12Title: "12. Incident Reporting & Support", reportBtn: "Open Form", legalTitle: "🧠 Legal Summary Statement" }
    },
    "Hindi": {
        report: { title: "एक समस्या की रिपोर्ट करें", subtitle: "बग या सुरक्षा चिंताओं की रिपोर्ट करके हमें बेहतर बनाने में मदद करें।", bug: "बग", security: "सुरक्षा", other: "अन्य", submit: "रिपोर्ट सबमिट करें", close: "बंद करें" },
        security: { pageTitle: "सुरक्षा और दिशानिर्देश", s12Title: "12. घटना रिपोर्टिंग और सहायता", reportBtn: "फॉर्म खोलें", legalTitle: "🧠 कानूनी सारांश विवरण" }
    },
    "Spanish": {
        report: { title: "Reportar un problema", subtitle: "Ayúdenos a mejorar informando sobre errores o problemas de seguridad.", bug: "Error", security: "Seguridad", other: "Otro", submit: "Enviar informe", close: "Cerrar" },
        security: { pageTitle: "Seguridad y Directrices", s12Title: "12. Informe de Incidentes y Soporte", reportBtn: "Abrir Formulario", legalTitle: "🧠 Declaración de Resumen Legal" }
    },
    "French": {
        report: { title: "Signaler un problème", subtitle: "Aidez-nous à nous améliorer en signalant des bogues ou des problèmes de sécurité.", bug: "Bogue", security: "Sécurité", other: "Autre", submit: "Envoyer le rapport", close: "Fermer" },
        security: { pageTitle: "Sécurité et Directives", s12Title: "12. Signalement d'Incidents et Support", reportBtn: "Ouvrir le Formulaire", legalTitle: "🧠 Résumé Juridique" }
    },
    "German": {
        report: { title: "Ein Problem melden", subtitle: "Helfen Sie uns, besser zu werden, indem Sie Fehler oder Sicherheitsbedenken melden.", bug: "Fehler", security: "Sicherheit", other: "Sonstiges", submit: "Bericht senden", close: "Schließen" },
        security: { pageTitle: "Sicherheit und Richtlinien", s12Title: "12. Vorfallsmeldung und Support", reportBtn: "Formular öffnen", legalTitle: "🧠 Rechtliche Zusammenfassung" }
    },
    "Arabic": {
        report: { title: "الإبلاغ عن مشكلة", subtitle: "ساعدنا في التحسن من خلال الإبلاغ عن الأخطاء أو المخاوف الأمنية.", bug: "خطأ", security: "أمن", other: "آخر", submit: "إرسال التقرير", close: "إغلاق" },
        security: { pageTitle: "الأمن والإرشادات", s12Title: "12. الإبلاغ عن الحوادث والدعم", reportBtn: "افتح النموذج", legalTitle: "🧠 بيان الملخص القانوني" }
    },
    "Mandarin Chinese": {
        report: { title: "报告问题", subtitle: "通过报告漏洞或安全问题帮助我们改进。", bug: "漏洞", security: "安全", other: "其他", submit: "提交报告", close: "关闭" },
        security: { pageTitle: "安全与准则", s12Title: "12. 事件报告与支持", reportBtn: "打开表单", legalTitle: "🧠 法律摘要声明" }
    },
    "Portuguese": {
        report: { title: "Reportar um problema", subtitle: "Ajude-nos a melhorar relatando bugs ou preocupações de segurança.", bug: "Bug", security: "Segurança", other: "Outro", submit: "Enviar relatório", close: "Fechar" },
        security: { pageTitle: "Segurança e Diretrizes", s12Title: "12. Relato de Incidentes e Suporte", reportBtn: "Abrir Formulário", legalTitle: "🧠 Declaração de Resumo Jurídico" }
    },
    "Russian": {
        report: { title: "Сообщить о проблеме", subtitle: "Помогите нам стать лучше, сообщая об ошибках или проблемах с безопасностью.", bug: "Ошибка", security: "Безопасность", other: "Другое", submit: "Отправить отчет", close: "Закрыть" },
        security: { pageTitle: "Безопасность и Правила", s12Title: "12. Отчет об Инцидентах и Поддержка", reportBtn: "Открыть Форму", legalTitle: "🧠 Юридическое Резюме" }
    },
    "Japanese": {
        report: { title: "問題を報告する", subtitle: "バグやセキュリティ上の懸念を報告して改善にご協力ください。", bug: "バグ", security: "セキュリティ", other: "その他", submit: "レポートを送信", close: "閉じる" },
        security: { pageTitle: "セキュリティとガイドライン", s12Title: "12. インシデント報告とサポート", reportBtn: "フォームを開く", legalTitle: "🧠 法的要約ステートメント" }
    },
    "Korean": {
        report: { title: "문제 보고", subtitle: "버그나 보안 문제를 보고하여 개선에 도움을 주세요.", bug: "버그", security: "보안", other: "기타", submit: "보고서 제출", close: "닫기" },
        security: { pageTitle: "보안 및 지침", s12Title: "12. 사고 보고 및 지원", reportBtn: "양식 열기", legalTitle: "🧠 법적 요약문" }
    },
    "Bengali": {
        report: { title: "একটি সমস্যা রিপোর্ট করুন", subtitle: "বাগ বা নিরাপত্তা উদ্বেগ রিপোর্ট করে আমাদের উন্নতি করতে সাহায্য করুন।", bug: "বাগ", security: "নিরাপত্তা", other: "অন্যান্য", submit: "রিপোর্ট জমা দিন", close: "বন্ধ করুন" },
        security: { pageTitle: "নিরাপত্তা ও নির্দেশিকা", s12Title: "12. ঘটনা রিপোর্टिंग এবং সহায়তা", reportBtn: "ফর্ম খুলুন", legalTitle: "🧠 আইনি সারাংশ বিবরণ" }
    },
    "Marathi": {
        report: { title: "समस्येचा अहवाल द्या", subtitle: "बग किंवा सुरक्षा समस्यांचा अहवाल देऊन आम्हाला सुधारण्यास मदत करा.", bug: "बग", security: "सुरक्षा", other: "इतर", submit: "अहवाल सादर करा", close: "बंद करा" },
        security: { pageTitle: "सुरक्षा आणि मार्गदर्शक तत्त्वे", s12Title: "12. घटना अहवाल आणि समर्थन", reportBtn: "फॉर्म उघडा", legalTitle: "🧠 कायदेशीर सारांश विधान" }
    },
    "Telugu": {
        report: { title: "సమస్యను నివేదించండి", subtitle: "బగ్‌లు లేదా భద్రతా సమస్యలను నివేదించడం ద్వారా మాకు సహాయపడండి.", bug: "బగ్", security: "భద్రత", other: "ఇతర", submit: "నివేదికను సమర్పించండి", close: "ముగించు" },
        security: { pageTitle: "భద్రత మరియు మార్గదర్శకాలు", s12Title: "12. ఇన్సిడెంట్ రిపోర్టింగ్ మరియు సపోర్ట్", reportBtn: "ఫారమ్‌ను తెరవండి", legalTitle: "🧠 లీగల్ సమ్మరీ స్టేట్‌మెంట్" }
    },
    "Turkish": {
        report: { title: "Sorun Bildir", subtitle: "Hataları veya güvenlik endişelerini bildirerek gelişmemize yardımcı olun.", bug: "Hata", security: "Güvenlik", other: "Diğer", submit: "Raporu Gönder", close: "Kapat" },
        security: { pageTitle: "Güvenlik ve Kurallar", s12Title: "12. Olay Bildirimi ve Destek", reportBtn: "Formu Aç", legalTitle: "🧠 Yasal Özet Beyanı" }
    },
    "Tamil": {
        report: { title: "ஒரு சிக்கலைப் புகாரளிக்கவும்", subtitle: "பிழைகள் அல்லது பாதுகாப்பு கவலைகளைப் புகாரளிப்பதன் மூலம் எங்களுக்கு உதவவும்.", bug: "பிழை", security: "பாபாதுகாப்பு", other: "பிற", submit: "அறிக்கையைச் சமர்ப்பிக்கவும்", close: "மூடு" },
        security: { pageTitle: "பாதுகாப்பு மற்றும் வழிகாட்டுதல்கள்", s12Title: "12. சம்பவ அறிக்கையிடல் மற்றும் ஆதரவு", reportBtn: "படிவத்தைத் திறக்கவும்", legalTitle: "🧠 சட்ட சுருக்க அறிக்கை" }
    },
    "Kannada": {
        report: { title: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ", subtitle: "ದೋಷಗಳು ಅಥವಾ ಭದ್ರತಾ ಕಾಳಜಿಗಳನ್ನು ವರದಿ ಮಾಡುವ ಮೂಲಕ ನಮಗೆ ಸಹಾಯ ಮಾಡಿ.", bug: "ದೋಷ", security: "ಭದ್ರತೆ", other: "ಇತರ", submit: "ವರದಿಯನ್ನು ಸಲ್ಲಿಸಿ", close: "ಮುಚ್ಚಿ" },
        security: { pageTitle: "ಭದ್ರತೆ ಮತ್ತು ಮಾರ್ಗಸೂಚಿಗಳು", s12Title: "12. ಘಟನೆ ವರದಿ ಮತ್ತು ಬೆಂಬಲ", reportBtn: "ಫಾರ್ಮ್ ಓಪನ್ ಮಾಡಿ", legalTitle: "🧠 ಕಾನೂನು ಸಾರಾಂಶ ಹೇಳಿಕೆ" }
    },
    "Malayalam": {
        report: { title: "ഒരു പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക", subtitle: "ബഗുകളോ സുരക്ഷാ പ്രശ്നങ്ങളോ റിപ്പോർട്ട് ചെയ്തുകൊണ്ട് മെച്ചപ്പെടുത്താൻ സഹായിക്കുക.", bug: "ബഗ്", security: "സുരക്ഷ", other: "മറ്റുള്ളവ", submit: "റിപ്പോർട്ട് സമർപ്പിക്കുക", close: "അടയ്ക്കുക" },
        security: { pageTitle: "സുരക്ഷയും മാർഗ്ഗനിർദ്ദേശങ്ങളും", s12Title: "12. സംഭവ റിപ്പോർട്ടിംഗും പിന്തുണയും", reportBtn: "ഫോം തുറക്കുക", legalTitle: "🧠 നിയമപരമായ സംഗ്രഹ പ്രസ്താവന" }
    },
    "Italian": {
        report: { title: "Segnala un problema", subtitle: "Aiutaci a migliorare segnalando bug o problemi di sicurezza.", bug: "Bug", security: "Sicurezza", other: "Altro", submit: "Invia segnalazione", close: "Chiudi" },
        security: { pageTitle: "Sicurezza e Linee Guida", s12Title: "12. Segnalazione Incidenti e Supporto", reportBtn: "Apri Modulo", legalTitle: "🧠 Dichiarazione di Sintesi Legale" }
    },
    "Dutch": {
        report: { title: "Een probleem melden", subtitle: "Help ons te verbeteren door bugs of beveiligingsproblemen te melden.", bug: "Bug", security: "Beveiliging", other: "Overig", submit: "Rapport indienen", close: "Sluiten" },
        security: { pageTitle: "Beveiliging en Richtlijnen", s12Title: "12. Incidentrapportage en Ondersteuning", reportBtn: "Formulier Openen", legalTitle: "🧠 Juridische Samenvatting" }
    },
    "Urdu": {
        report: { title: "کسی مسئلے کی اطلاع دیں", subtitle: "بگ یا سیکیورٹی خدشات کی اطلاع دے کر ہمیں بہتر بنانے میں مدد کریں۔", bug: "بگ", security: "سیکیورٹی", other: "دیگر", submit: "رپورٹ جمع کروائیں", close: "بند کریں" },
        security: { pageTitle: "سیکیورٹی اور رہنما خطوط", s12Title: "12. واقعے کی رپورٹنگ اور سپورٹ", reportBtn: "فارم کھولیں", legalTitle: "🧠 قانونی خلاصہ بیان" }
    },
    "Gujarati": {
        report: { title: "સમસ્યાની જાણ કરો", subtitle: "ભૂલો અથવા સુરક્ષા ચિંતાઓ વિશે જણાવીને અમને સુધારવામાં મદદ કરો.", bug: "ભૂલ", security: "સુરક્ષા", other: "અન્ય", submit: "રિપોર્ટ સબમિટ કરો", close: "બંધ કરો" },
        security: { pageTitle: "સુરક્ષા અને માર્ગદર્શિકા", s12Title: "12. ઇન્સિડન્ટ રિપોર્ટિંગ અને સપોર્ટ", reportBtn: "ફોર્મ ખોલો", legalTitle: "🧠 કાનૂની સારાંશ નિવેદન" }
    },
    "Polish": {
        report: { title: "Zgłoś problem", subtitle: "Pomóż nam ulepszyć platformę, zgłaszając błędy lub luki w zabezpieczeniach.", bug: "Błąd", security: "Bezpieczeństwo", other: "Inne", submit: "Prześlij zgłoszenie", close: "Zamknij" },
        security: { pageTitle: "Bezpieczeństwo i Wytyczne", s12Title: "12. Zgłaszanie Incydentów i Wsparcie", reportBtn: "Otwórz Formularz", legalTitle: "🧠 Oświadczenie o Podsumowaniu Prawnym" }
    },
    "Swedish": {
        report: { title: "Rapportera ett problem", subtitle: "Hjälp oss att förbättra genom att rapportera buggar eller säkerhetsproblem.", bug: "Bugg", security: "Säkerhet", other: "Annat", submit: "Skicka rapport", close: "Stäng" },
        security: { pageTitle: "Säkerhet och Riktlinjer", s12Title: "12. Incidentrapportering och Support", reportBtn: "Öppna Formulär", legalTitle: "🧠 Juridisk Sammanfattning" }
    },
    "Vietnamese": {
        report: { title: "Báo cáo một vấn đề", subtitle: "Giúp chúng tôi cải thiện bằng cách báo cáo lỗi hoặc lo ngại về bảo mật.", bug: "Lỗi", security: "Bảo mật", other: "Khác", submit: "Gửi báo cáo", close: "Đóng" },
        security: { pageTitle: "Bảo mật và Hướng dẫn", s12Title: "12. Báo cáo Sự cố và Hỗ trợ", reportBtn: "Mở Biểu mẫu", legalTitle: "🧠 Tóm tắt Pháp lý" }
    },
    "Thai": {
        report: { title: "รายงานปัญหา", subtitle: "ช่วยเราปรับปรุงโดยการรายงานบั๊กหรือข้อกังวลด้านความปลอดภัย", bug: "บั๊ก", security: "ความปลอดภัย", other: "อื่นๆ", submit: "ส่งรายงาน", close: "ปิด" },
        security: { pageTitle: "ความปลอดภัยและแนวทางปฏิบัติ", s12Title: "12. การรายงานเหตุการณ์และการสนับสนุน", reportBtn: "เปิดฟอร์ม", legalTitle: "สรุปสาระสำคัญทางกฎหมาย" }
    }
};

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
            const data = localizedData[capturingLang];

            if (data) {
                // Update reportIssue
                blockStr = blockStr.replace(/reportIssue: \{[\s\S]+?\}/, `reportIssue: {
                title: "${data.report.title}",
                subtitle: "${data.report.subtitle}",
                typeLabel: "Issue Type",
                bug: "${data.report.bug}",
                security: "${data.report.security}",
                other: "${data.report.other}",
                priorityLabel: "Priority",
                low: "Low - Minor cosmetic issue",
                medium: "Medium - Functionality impacted",
                high: "High - Critical system failure",
                descriptionLabel: "Description",
                descriptionPlaceholder: "Please describe the issue in detail...",
                cancel: "Cancel",
                submit: "${data.report.submit}",
                successTitle: "Report Submitted!",
                successMessage: "Thank you for helping us make A-Series better.",
                close: "${data.report.close}"
            }`);

                // Update securityGuidelines Section 12 specifically
                blockStr = blockStr.replace(/section12: \{[\s\S]+?\}/, `section12: {
                        title: "${data.security.s12Title}",
                        mainText: "If you witness any security violations, encounter technical issues, or need urgent assistance, please report them immediately.",
                        reportButton: "Report in App:",
                        reportButtonText: "${data.security.reportBtn}",
                        supportButton: "Support:"
                    }`);

                // Update securityGuidelines pageTitle and legalTitle
                blockStr = blockStr.replace(/pageTitle: "[^"]+"/, `pageTitle: "${data.security.pageTitle}"`);
                blockStr = blockStr.replace(/legalSummaryTitle: "[^"]+"/, `legalSummaryTitle: "${data.security.legalTitle}"`);
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
console.log('SUCCESS: Global localization applied to 26 languages.');
