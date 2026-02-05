const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const marketplaceTranslations = {
    "title": {
        "english": "AI Marketplace",
        "hindi": "एआई मार्केटप्लेस",
        "bengali": "এআই মার্কেটপ্লেস",
        "marathi": "एआय बाजारपेठ", // AI Marketplace
        "gujarati": "એઆઈ માર્કેટપ્લેસ",
        "tamil": "AI சந்தை", // AI Marketplace
        "telugu": "AI మార్కెట్‌ప్లేస్",
        "arabic": "سوق الذكاء الاصطناعي",
        "french": "Marché de l'IA",
        "spanish": "Mercado de IA"
    },
    "subtitle": {
        "english": "Discover and deploy specialized AI agents for your business.",
        "hindi": "अपने व्यवसाय के लिए विशेष एआई एजेंट खोजें और तैनात करें।",
        "bengali": "আপনার ব্যবসার জন্য বিশেষ এআই এজেন্ট আবিষ্কার এবং স্থাপন করুন।",
        "marathi": "आपल्या व्यवसायासाठी विशेष एआय एजंट शोधा आणि तैनात करा.",
        "gujarati": "તમારા વ્યવસાય માટે વિશિષ્ટ એઆઈ એજન્ટો શોધો અને જમા કરો.",
        "tamil": "உங்கள் வணிகத்திற்கான சிறப்பு AI முகவர்களைக் கண்டறிந்து பயன்படுத்தவும்.",
        "telugu": "మీ వ్యాపారం కోసం ప్రత్యేక AI ఏజెంట్లను కనుగొనండి మరియు అమలు చేయండి.",
        "arabic": "اكتشف ونشر وكلاء الذكاء الاصطناعي المتخصصين لعملك.",
        "french": "Découvrez et déployez des agents IA spécialisés pour votre entreprise.",
        "spanish": "Descubra e implemente agentes de IA especializados para su negocio."
    },
    "searchPlaceholder": {
        "english": "Search agents...",
        "hindi": "एजेंट खोजें...",
        "bengali": "এজেন্ট অনুসন্ধান করুন...",
        "marathi": "एजंट शोधा...",
        "gujarati": "એજન્ટો શોધો...",
        "tamil": "முகவர்களைத் தேடுங்கள்...",
        "telugu": "ఏజెంట్లను శోధించండి...",
        "arabic": "بحث عن الوكلاء...",
        "french": "Rechercher des agents...",
        "spanish": "Buscar agentes..."
    },
    "demo": {
        "english": "Demo",
        "hindi": "डेमो",
        "bengali": "ডেমো",
        "marathi": "डेमो",
        "gujarati": "ડેમો",
        "tamil": "டெமோ",
        "telugu": "డెమో",
        "arabic": "تجريب",
        "french": "Démo",
        "spanish": "Demostración"
    },
    "subscribe": {
        "english": "Subscribe",
        "hindi": "सदस्यता लें",
        "bengali": "সাবস্ক্রাইব করুন",
        "marathi": "सदस्यता घ्या",
        "gujarati": "સબ્સ્ક્રાઇબ કરો",
        "tamil": "பதிவுசேரவும்",
        "telugu": "సబ్ స్క్రైబ్",
        "arabic": "اشتراك",
        "french": "S'abonner",
        "spanish": "Suscribirse"
    },
    "subscribed": {
        "english": "Subscribed",
        "hindi": "सदस्यता ली गई",
        "bengali": "সাবস্ক্রাইব করা হয়েছে",
        "marathi": "सदस्यता घेतली",
        "gujarati": "સબ્સ્ક્રાઇબ કર્યું",
        "tamil": "பதிவுசெய்யப்பட்டது",
        "telugu": "సబ్ స్క్రైబ్ చేయబడింది",
        "arabic": "مشترك",
        "french": "Abonné",
        "spanish": "Suscrito"
    },
    "unavailable": {
        "english": "Unavailable",
        "hindi": "अनुपलब्ध",
        "bengali": "অনুপলব্ধ",
        "marathi": "अनुपलब्ध",
        "gujarati": "અનુપલબ્ધ",
        "tamil": "கிடைக்கவில்லை",
        "telugu": "అందుబాటులో లేదు",
        "arabic": "غير متوفر",
        "french": "Indisponible",
        "spanish": "No disponible"
    },
    "openApp": {
        "english": "Open App",
        "hindi": "ऐप खोलें",
        "bengali": "অ্যাপ খুলুন",
        "marathi": "अॅप उघडा",
        "gujarati": "એપ ખોલો",
        "tamil": "பயன்பாட்டைத் திறக்கவும்",
        "telugu": "యాప్ తెరవండి",
        "arabic": "افتح التطبيق",
        "french": "Ouvrir l'application",
        "spanish": "Abrir aplicación"
    },
    "viewInvoice": {
        "english": "View Invoice",
        "hindi": "चालान देखें",
        "bengali": "চালান দেখুন",
        "marathi": "इनव्हॉइस पहा", // View Invoice
        "gujarati": "ઇન્વોઇસ જુઓ",
        "tamil": "விலைப்பட்டியலைக் காண்க", // View Invoice
        "telugu": "ఇన్‌వాయిస్‌ను వీక్షించండి",
        "arabic": "عرض الفاتورة",
        "french": "Voir la facture",
        "spanish": "Ver factura"
    },
    "productDemo": {
        "english": "Product Demo",
        "hindi": "उत्पाद डेमो",
        "bengali": "পণ্য ডেমো",
        "marathi": "उत्पादन डेमो",
        "gujarati": "ઉત્પાદન ડેમો",
        "tamil": "தயாரிப்பு டெமோ",
        "telugu": "ఉత్పత్తి డెమో",
        "arabic": "عرض المنتج",
        "french": "Démo produit",
        "spanish": "Demostración del producto"
    },
    "gotIt": {
        "english": "Got it",
        "hindi": "समझ गया",
        "bengali": "বুঝেছি",
        "marathi": "समजले",
        "gujarati": "સમજી ગયો",
        "tamil": "புரிந்தது",
        "telugu": "అర్థమైంది",
        "arabic": "فهمت",
        "french": "Compris",
        "spanish": "Entendido"
    },
    "aiPersonalAssistant": {
        "english": "AI Personal Assistant",
        "hindi": "एआई पर्सनल असिस्टेंट",
        "bengali": "এআই ব্যক্তিগত সহকারী",
        "marathi": "एआई वैयक्तिक सहाय्यक",
        "gujarati": "એઆઈ પર્સનલ આસિસ્ટન્ટ",
        "tamil": "AI தனிப்பட்ட உதவியாளர்",
        "telugu": "AI వ్యక్తిగత సహాయకుడు",
        "arabic": "مساعد شخصي بالذكاء الاصطناعي",
        "french": "Assistant personnel IA",
        "spanish": "Asistente personal de IA"
    },
    "productivity": {
        "english": "PRODUCTIVITY",
        "hindi": "उत्पादकता",
        "bengali": "প্রমোদ",
        "marathi": "उत्पादकता",
        "gujarati": "ઉત્પાદકતા",
        "tamil": "உற்பத்தித்திறன்",
        "telugu": "ఉత్పాదకత",
        "arabic": "إنتاجية",
        "french": "PRODUCTIVITÉ",
        "spanish": "PRODUCTIVIDAD"
    },
    "personalAssistantDesc": {
        "english": "Your dedicated AI assistant for scheduling, notes, and task management.",
        "hindi": "शेड्यूलिंग, नोट्स और कार्य प्रबंधन के लिए आपका समर्पित एआई सहायक।",
        "bengali": "সময়সূচী, নোট এবং টাস্ক ম্যানেজমেন্টের জন্য আপনার নিবেদিত এআই সহকারী।",
        "marathi": "वेळापत्रक, नोट्स आणि कार्य व्यवस्थापनासाठी आपला समर्पित एआई सहाय्यक.",
        "gujarati": "શેડ્યૂલિંગ, નોંધો અને કાર્ય વ્યવસ્થાપન માટે તમારું સમર્પિત એઆઈ સહાયક.",
        "tamil": "திட்டமிடல், குறிப்புகள் மற்றும் பணி மேலாண்மைக்கான உங்கள் அர்ப்பணிப்பு AI உதவியாளர்.",
        "telugu": "షెడ్యూలింగ్, గమనికలు మరియు టాస్క్ మేనేజ్‌మెంట్ కోసం మీ అంకితమైన AI సహాయకుడు.",
        "arabic": "مساعدك المخصص للجدولة والملاحظات وإدارة المهام.",
        "french": "Votre assistant IA dédié pour la planification, les notes et la gestion des tâches.",
        "spanish": "Su asistente de IA dedicado para programación, notas y gestión de tareas."
    },
    "categories": {
        "all": { "english": "All Categories", "hindi": "सभी श्रेणियां", "marathi": "सर्व श्रेणी", "tamil": "அனைத்து பிரிவுகளும்", "arabic": "جميع الفئات", "spanish": "Todas las categorías", "bengali": "সমস্ত বিভাগ", "gujarati": "બધી શ્રેણીઓ", "telugu": "అన్ని వర్గాలు", "french": "Toutes catégories" },
        "business_os": { "english": "Business OS", "hindi": "बिजनेस ओएस", "marathi": "बिझनेस ओएस", "tamil": "வணிக OS", "arabic": "نظام تشغيل الأعمال", "spanish": "SO empresarial", "bengali": "বিজনেস ওএস", "gujarati": "બિઝનેસ ઓએસ", "telugu": "బిజినెస్ OS", "french": "OS d'entreprise" },
        "data_intelligence": { "english": "Data & Intelligence", "hindi": "डेटा और इंटेलिजेंस", "marathi": "डेटा आणि इंटेलिजन्स", "tamil": "தரவு மற்றும் நுண்ணறிவு", "arabic": "البيانات والذكاء", "spanish": "Datos e inteligencia", "bengali": "ডেটা এবং বুদ্ধিমত্তা", "gujarati": "ડેટા અને ઇન્ટેલિજન્સ", "telugu": "డేటా & ఇంటెలిజెన్స్", "french": "Données et intelligence" },
        "sales_marketing": { "english": "Sales & Marketing", "hindi": "बिक्री और विपणन", "marathi": "विक्री आणि विपणन", "tamil": "விற்பனை மற்றும் சந்தைப்படுத்தல்", "arabic": "المبيعات والتسويق", "spanish": "Ventas y marketing", "bengali": "বিক্রয় এবং বিপণন", "gujarati": "વેચાણ અને માર્કેટિંગ", "telugu": "అమ్మకాలు & మార్కెటింగ్", "french": "Ventes et marketing" },
        "hr_finance": { "english": "HR & Finance", "hindi": "मानव संसाधन और वित्त", "marathi": "एचआर आणि वित्त", "tamil": "மனிதவளம் மற்றும் நிதி", "arabic": "الموارد البشرية والمالية", "spanish": "RRHH y finanzas", "bengali": "এইচআর এবং অর্থ", "gujarati": "એચઆર અને ફાઇનાન્સ", "telugu": "HR & ఫైనాన్స్", "french": "RH et finances" },
        "design_creative": { "english": "Design & Creative", "hindi": "डिज़ाइन और रचनात्मक", "marathi": "डिझाइन आणि क्रिएटिव्ह", "tamil": "வடிவமைப்பு மற்றும் ஆக்கப்பூர்வம்", "arabic": "التصميم والإبداع", "spanish": "Diseño y creatividad", "bengali": "নকশা এবং সৃজনশীল", "gujarati": "ડિઝાઇન અને ક્રિએટિવ", "telugu": "డిజైన్ & క్రియేటివ్", "french": "Design et créatif" },
        "medical_health": { "english": "Medical & Health AI", "hindi": "चिकित्सा और स्वास्थ्य एआई", "marathi": "वैद्यकीय आणि आरोग्य एआय", "tamil": "மருத்துவம் மற்றும் ஆரோக்கியம் AI", "arabic": "الذكاء الاصطناعي الطبي والصحي", "spanish": "IA médica y de salud", "bengali": "মেডিকেল এবং স্বাস্থ্য এআই", "gujarati": "તબીબી અને આરોગ્ય એઆઈ", "telugu": "మెడికల్ & హెల్త్ AI", "french": "IA médicale et santé" }
    }
};

const languages = ["hindi", "bengali", "marathi", "gujarati", "tamil", "telugu", "arabic", "english", "french", "spanish"];

languages.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (!content.marketplacePage) content.marketplacePage = {};

            Object.keys(marketplaceTranslations).forEach(key => {
                if (key === 'categories') {
                    if (!content.marketplacePage.categories) content.marketplacePage.categories = {};
                    Object.keys(marketplaceTranslations.categories).forEach(catKey => {
                        content.marketplacePage.categories[catKey] = marketplaceTranslations.categories[catKey][lang] || marketplaceTranslations.categories[catKey]['english'];
                    });
                } else {
                    content.marketplacePage[key] = marketplaceTranslations[key][lang] || marketplaceTranslations[key]['english'];
                }
            });

            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            console.log(`Updated marketplacePage in ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json`, e);
        }
    }
});
