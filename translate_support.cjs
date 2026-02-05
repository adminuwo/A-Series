const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const keysToAdd = {
    // Categories and Statuses
    "report": {
        "hindi": "रिपोर्ट",
        "bengali": "রিপোর্ট",
        "marathi": "रिपोर्ट",
        "gujarati": "રિપોર્ટ",
        "tamil": "அறிக்கை",
        "telugu": "నివేదిక",
        "arabic": "تقرير",
        "english": "Report",
        "french": "Rapport",
        "spanish": "Reporte"
    },
    "ticket": {
        "hindi": "टिकट",
        "bengali": "টিকেট",
        "marathi": "तिकीट",
        "gujarati": "ટિકિટ",
        "tamil": "டிக்கெட்",
        "telugu": "టికెట్",
        "arabic": "تذكرة",
        "english": "Ticket",
        "french": "Billet",
        "spanish": "Ticket"
    },
    "general_inquiry": {
        "hindi": "सामान्य पूछताछ",
        "bengali": "সাধারণ অনুসন্ধান",
        "marathi": "सामान्य चौकशी",
        "gujarati": "સામાન્ય પૂછપરછ",
        "tamil": "பொது விசாரணை",
        "telugu": "సాధారణ విచారణ",
        "arabic": "استفسار عام",
        "english": "General Inquiry",
        "french": "Enquête générale",
        "spanish": "Consulta general"
    },
    "app_issue": {
        "hindi": "ऐप समस्या",
        "bengali": "অ্যাপ সমস্যা",
        "marathi": "अॅप समस्या",
        "gujarati": "એપ સમસ્યા",
        "tamil": "பயன்பாட்டுச் சிக்கல்",
        "telugu": "యాప్ సమస్య",
        "arabic": "مشكلة التطبيق",
        "english": "App Issue",
        "french": "Problème d'application",
        "spanish": "Problema de la aplicación"
    },
    "technical_support": {
        "hindi": "तकनीकी सहायता",
        "bengali": "প্রযুক্তিগত সহায়তা",
        "marathi": "तांत्रिक सहाय्य",
        "gujarati": "તકનીકી સપોર્ટ",
        "tamil": "தொழில்நுட்ப ஆதரவு",
        "telugu": "సాంకేతిక మద్దతు",
        "arabic": "دعم تقني",
        "english": "Technical Support",
        "french": "Support technique",
        "spanish": "Soporte técnico"
    },
    "open": {
        "hindi": "खुला",
        "bengali": "খোলা",
        "marathi": "उघडा",
        "gujarati": "ખુલ્લું",
        "tamil": "திறந்த",
        "telugu": "ఓపెన్",
        "arabic": "مفتوح",
        "english": "Open",
        "french": "Ouvert",
        "spanish": "Abierto"
    },
    "resolved": {
        "hindi": "सुलझाया",
        "bengali": "সমাধানকৃত",
        "marathi": "सोडवले",
        "gujarati": "ઉકેલાયેલ",
        "tamil": "தீர்க்கப்பட்டது",
        "telugu": "పరిష్కరించబడింది",
        "arabic": "تم الحل",
        "english": "Resolved",
        "french": "Résolu",
        "spanish": "Resuelto"
    },
    "in-progress": {
        "hindi": "प्रगति में",
        "bengali": "চলমান",
        "marathi": "प्रगतीपथावर",
        "gujarati": "પ્રગતિમાં",
        "tamil": "செயல்பாட்டில்",
        "telugu": "పురోగతిలో ఉంది",
        "arabic": "في طور الإنجاز",
        "english": "In Progress",
        "french": "En cours",
        "spanish": "En progreso"
    },
    // Sender Detail Labels
    "sender_name": { // For "Name"
        "hindi": "नाम",
        "bengali": "নাম",
        "marathi": "नाव",
        "gujarati": "નામ",
        "tamil": "பெயர்",
        "telugu": "పేరు",
        "arabic": "اسم",
        "english": "Name",
        "french": "Nom",
        "spanish": "Nombre"
    },
    "sender_email": { // For "Email Address" if auth.email not suitable or specific
        "hindi": "ईमेल पता",
        "bengali": "ইমেল ঠিকানা",
        "marathi": "ईमेल पत्ता",
        "gujarati": "ઇમેઇલ સરનામું",
        "tamil": "மின்னஞ்சல் முகவரி",
        "telugu": "ఇమెయిల్ చిరునామా",
        "arabic": "عنوان البريد الإلكتروني",
        "english": "Email Address",
        "french": "Adresse e-mail",
        "spanish": "Dirección de correo"
    }
};

const languages = ["hindi", "bengali", "marathi", "gujarati", "tamil", "telugu", "arabic", "english", "french", "spanish"];

languages.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            Object.keys(keysToAdd).forEach(key => {
                // Add simple lowercase keys
                content[key] = keysToAdd[key][lang];
            });

            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            console.log(`Updated support keys in ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json`, e);
        }
    }
});
