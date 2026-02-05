const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const translations = {
    "all": {
        "hindi": "सभी",
        "bengali": "সব",
        "marathi": "सर्व",
        "gujarati": "બધું",
        "tamil": "அனைத்தும்", // All
        "telugu": "అన్నీ",
        "arabic": "الكل",
        "english": "All",
        "french": "Tout",
        "spanish": "Todo"
    },
    "contactUs": {
        "hindi": "संपर्क करें",
        "bengali": "যোগাযোগ করুন",
        "marathi": "संपर्क करा",
        "gujarati": "અમારો સંપર્ક કરો",
        "tamil": "எங்களை தொடர்பு கொள்ள", // Contact Us
        "telugu": "మమ్మల్ని సంప్రదించండి",
        "arabic": "اتصل بنا",
        "english": "Contact Us",
        "french": "Contactez-nous",
        "spanish": "Contáctenos"
    },
    "helpCenter": {
        "hindi": "सहायता केंद्र",
        "bengali": "সহায়তা কেন্দ্র",
        "marathi": "मदत केंद्र",
        "gujarati": "સહાય કેન્દ્ર",
        "tamil": "உதவி மையம்", // Help Center
        "telugu": "సహాయ కేంద్రం",
        "arabic": "مركز المساعدة",
        "english": "Help Center",
        "french": "Centre d'aide",
        "spanish": "Centro de ayuda"
    },
    "security": {
        "hindi": "सुरक्षा",
        "bengali": "নিরাপত্তা",
        "marathi": "सुरक्षा",
        "gujarati": "સુરક્ષા",
        "tamil": "பாதுகாப்பு", // Security
        "telugu": "భద్రత",
        "arabic": "تأمين",
        "english": "Security",
        "french": "Sécurité",
        "spanish": "Seguridad"
    },
    "searchPlaceholder": {
        "hindi": "नाम, ईमेल या विषय द्वारा खोजें...",
        "bengali": "নাম, ইমেল বা বিষয় দ্বারা অনুসন্ধান করুন...",
        "marathi": "नाव, ईमेल किंवा विषयानुसार शोधा...",
        "gujarati": "નામ, ઇમેઇલ અથવા વિષય દ્વારા શોધો...",
        "tamil": "பெயர், மின்னஞ்சல் அல்லது இது குறித்து தேடவும்...", // Search by ...
        "telugu": "పేరు, ఇమెయిల్ లేదా విషయం ద్వారా శోధించండి...",
        "arabic": "البحث بالاسم أو البريد الإلكتروني أو الموضوع...",
        "english": "Search by name, email, or subject...",
        "french": "Rechercher par nom, e-mail ou sujet...",
        "spanish": "Buscar por nombre, correo electrónico o asunto..."
    },
    "messageContent": {
        "hindi": "संदेश सामग्री",
        "bengali": "বার্তার বিষয়বস্তু",
        "marathi": "संदेश सामग्री",
        "gujarati": "સંદેશ સામગ્રી",
        "tamil": "செய்தி உள்ளடக்கம்", // Message Content
        "telugu": "సందేశ కంటెంట్",
        "arabic": "محتوى الرسالة",
        "english": "Message Content",
        "french": "Contenu du message",
        "spanish": "Contenido del mensaje"
    },
    "resolutionNotes": {
        "hindi": "समाधान नोट्स और कार्रवाई",
        "bengali": "রেজোলিউশন নোট এবং কর্ম",
        "marathi": "रिझोल्यूशन नोट्स आणि कृती",
        "gujarati": "રિઝોલ્યુશન નોંધો અને ક્રિયા",
        "tamil": "தீர்வு குறிப்புகள் & செயல்", // Resolution Notes & Action
        "telugu": "రిజల్యూషన్ గమనికలు & చర్య",
        "arabic": "ملاحظات الحل والإجراء",
        "english": "Resolution Notes & Action",
        "french": "Notes de résolution et action",
        "spanish": "Notas de resolución y acción"
    },
    "notesPlaceholder": {
        "hindi": "समाधान या प्रतिक्रिया के बारे में आंतरिक नोट्स जोड़ें...",
        "bengali": "রেজোলিউশন বা প্রতিক্রিয়া সম্পর্কে অভ্যন্তরীণ নোট যোগ করুন...",
        "marathi": "रिझोल्यूशन किंवा प्रतिसादाबद्दल अंतर्गत नोट्स जोडा...",
        "gujarati": "રિઝોલ્યુશન અથવા પ્રતિસાદ વિશે આંતરિક નોંધો ઉમેરો...",
        "tamil": "தீர்வு அல்லது பதில் பற்றிய உள் குறிப்புகளைச் சேர்க்கவும்...",
        "telugu": "రిజల్యూషన్ లేదా ప్రతిస్పందన గురించి అంతర్గత గమనికలను జోడించండి...",
        "arabic": "أضف ملاحظات داخلية حول الحل أو الرد...",
        "english": "Add internal notes about the resolution or response...",
        "french": "Ajouter des notes internes sur la résolution ou la réponse...",
        "spanish": "Agregar notas internas sobre la resolución o respuesta..."
    },
    "markResolved": {
        "hindi": "सुलझाया हुआ चिह्नित करें",
        "bengali": "সমাধান হিসেবে চিহ্নিত করুন",
        "marathi": "सोडवलेले म्हणून चिन्हांकित करा",
        "gujarati": "ઉકેલાયેલ તરીકે ચિહ્નિત કરો",
        "tamil": "தீர்க்கப்பட்டதாகக் குறிக்கவும்",
        "telugu": " Mark Resolved",
        "arabic": "وضع علامة تم الحل",
        "english": "Mark Resolved",
        "french": "Marquer comme résolu",
        "spanish": "Marcar como resuelto"
    },
    "submittedOn": {
        "hindi": "प्रस्तुत किया गया",
        "bengali": "জমা দেওয়া হয়েছে",
        "marathi": "सादर केले",
        "gujarati": "સબમિટ કર્યું",
        "tamil": "சமர்ப்பிக்கப்பட்டது",
        "telugu": "సమర్పించబడింది",
        "arabic": "تم تقديمه في",
        "english": "Submitted on",
        "french": "Soumis le",
        "spanish": "Enviado el"
    },
    "senderDetails": {
        "hindi": "प्रेषक विवरण",
        "bengali": "প্রেরকের বিবরণ",
        "marathi": "प्रेषक तपशील",
        "gujarati": "પ્રેષક વિગતો",
        "tamil": "அனுப்புநர் விவரங்கள்",
        "telugu": "పంపినవారి వివరాలు",
        "arabic": "تفاصيل المرسل",
        "english": "Sender Details",
        "french": "Détails de l'expéditeur",
        "spanish": "Detalles del remitente"
    },
    "subject": {
        "hindi": "विषय",
        "bengali": "বিষয়",
        "marathi": "विषय",
        "gujarati": "વિષય",
        "tamil": "பொருள்", // Subject
        "telugu": "విషయం",
        "arabic": "الموضوع",
        "english": "Subject",
        "french": "Sujet",
        "spanish": "Asunto"
    },
    "deleteInquiry": {
        "hindi": "पूछताछ हटाएं",
        "english": "Delete Inquiry"
    },
    "noInquiries": {
        "hindi": "कोई पूछताछ नहीं मिली।",
        "english": "No inquiries found."
    },
    "selectTicket": {
        "hindi": "एक टिकट चुनें",
        "english": "Select a Ticket"
    },
    "selectTicketDesc": {
        "hindi": "विवરણ देखने के लिए सूची में से एक पूछताछ चुनें",
        "english": "Select an inquiry from the list to view details"
    },
    "deleteConfirmTitle": {
        "hindi": "पूछताछ हटाएं?",
        "english": "Delete Inquiry?"
    },
    "deleteConfirmMessage": {
        "hindi": "क्या आप वाकई \"{title}\" को हटाना चाहते हैं?",
        "english": "Are you sure you want to delete \"{title}\"?"
    },
    "confirmDelete": {
        "hindi": "हां, हटाएं",
        "english": "Yes, Delete"
    }
};

const languages = ["hindi", "bengali", "marathi", "gujarati", "tamil", "telugu", "arabic", "english", "french", "spanish"];

languages.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            if (!content.admin) content.admin = {};
            if (!content.admin.support) content.admin.support = {};

            Object.keys(translations).forEach(key => {
                const val = translations[key][lang] || translations[key]['english']; // Fallback to english if lang missing in my map
                content.admin.support[key] = val;
            });

            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            console.log(`Updated admin.support in ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json`, e);
        }
    }
});
