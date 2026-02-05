const fs = require('fs');
const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';

const extraTranslations = {
    "English": {
        cancel: "Cancel",
        pricing: "Pricing",
        categories: {
            'Business OS': "Business OS",
            'Data & Intelligence': "Data & Intelligence",
            'Sales & Marketing': "Sales & Marketing",
            'HR & Finance': "HR & Finance",
            'Design & Creative': "Design & Creative",
            'Medical & Health AI': "Medical & Health AI",
            'general': "General"
        },
        pricingOptions: {
            'Free': "Free",
            'Subscription': "Subscription"
        }
    },
    "Hindi": {
        cancel: "रद्द करें",
        pricing: "मूल्य निर्धारण",
        categories: {
            'Business OS': "बिजनेस ओएस",
            'Data & Intelligence': "डेटा और इंटेलिजेंस",
            'Sales & Marketing': "बिक्री और विपणन",
            'HR & Finance': "एचआर और वित्त",
            'Design & Creative': "डिजाइन और रचनात्मक",
            'Medical & Health AI': "मेडिकल और हेल्थ एआई",
            'general': "सामान्य"
        },
        pricingOptions: {
            'Free': "नि: शुल्क",
            'Subscription': "सदस्यता"
        }
    },
    "Spanish": {
        cancel: "Cancelar",
        pricing: "Precios",
        categories: {
            'Business OS': "OS Empresarial",
            'Data & Intelligence': "Datos e Inteligencia",
            'Sales & Marketing': "Ventas y Marketing",
            'HR & Finance': "RR.HH. y Finanzas",
            'Design & Creative': "Diseño y Creatividad",
            'Medical & Health AI': "IA Médica y Salud",
            'general': "General"
        },
        pricingOptions: {
            'Free': "Gratis",
            'Subscription': "Suscripción"
        }
    },
    "French": {
        cancel: "Annuler",
        pricing: "Tarification",
        categories: {
            'Business OS': "Système d'exploitation d'entreprise",
            'Data & Intelligence': "Données et Intelligence",
            'Sales & Marketing': "Ventes et Marketing",
            'HR & Finance': "RH et Finance",
            'Design & Creative': "Design et Créativité",
            'Medical & Health AI': "IA Médicale et Santé",
            'general': "Général"
        },
        pricingOptions: {
            'Free': "Libre",
            'Subscription': "Abonnement"
        }
    },
    "German": {
        cancel: "Abbrechen",
        pricing: "Preisgestaltung",
        categories: {
            'Business OS': "Business-Betriebssystem",
            'Data & Intelligence': "Daten und Intelligenz",
            'Sales & Marketing': "Vertrieb und Marketing",
            'HR & Finance': "Personalwesen und Finanzen",
            'Design & Creative': "Design und Kreativität",
            'Medical & Health AI': "Medizinische und Gesundheits-KI",
            'general': "Allgemein"
        },
        pricingOptions: {
            'Free': "Kostenlos",
            'Subscription': "Abonnement"
        }
    },
    "Arabic": {
        cancel: "إلغاء",
        pricing: "التسعير",
        categories: {
            'Business OS': "نظام تشغيل الأعمال",
            'Data & Intelligence': "البيانات والذكاء",
            'Sales & Marketing': "المبيعات والتسويق",
            'HR & Finance': "الموارد البشرية والمالية",
            'Design & Creative': "التصميم والإبداع",
            'Medical & Health AI': "الذكاء الاصطناعي الطبي والصحي",
            'general': "عام"
        },
        pricingOptions: {
            'Free': "مجاني",
            'Subscription': "اشتراك"
        }
    },
    "Mandarin Chinese": {
        cancel: "取消",
        pricing: "定价",
        categories: {
            'Business OS': "商业操作系统",
            'Data & Intelligence': "数据与智能",
            'Sales & Marketing': "销售与市场营销",
            'HR & Finance': "人力资源与财务",
            'Design & Creative': "设计与创意",
            'Medical & Health AI': "医疗健康人工智能",
            'general': "通用"
        },
        pricingOptions: {
            'Free': "免费",
            'Subscription': "订阅"
        }
    },
    "Portuguese": {
        cancel: "Cancelar",
        pricing: "Preços",
        categories: {
            'Business OS': "Sistema Operacional de Negócios",
            'Data & Intelligence': "Dados e Inteligência",
            'Sales & Marketing': "Vendas e Marketing",
            'HR & Finance': "RH e Finanças",
            'Design & Creative': "Design e Creatividade",
            'Medical & Health AI': "IA Médica e de Saúde",
            'general': "Geral"
        },
        pricingOptions: {
            'Free': "Grátis",
            'Subscription': "Assinatura"
        }
    },
    "Russian": {
        cancel: "Отмена",
        pricing: "Цены",
        categories: {
            'Business OS': "Бизнес-ОС",
            'Data & Intelligence': "Данные и Интеллект",
            'Sales & Marketing': "Продажи и Маркетинг",
            'HR & Finance': "HR и Финансы",
            'Design & Creative': "Дизайн и Креатив",
            'Medical & Health AI': "ИИ в медицине и здравоохранении",
            'general': "Общее"
        },
        pricingOptions: {
            'Free': "Бесплатно",
            'Subscription': "Подписка"
        }
    },
    "Japanese": {
        cancel: "キャンセル",
        pricing: "料金体系",
        categories: {
            'Business OS': "ビジネスOS",
            'Data & Intelligence': "データとインテリジェンス",
            'Sales & Marketing': "セールス＆マーケティング",
            'HR & Finance': "人事・財務",
            'Design & Creative': "デザイン＆クリエイティブ",
            'Medical & Health AI': "医療・健康AI",
            'general': "一般"
        },
        pricingOptions: {
            'Free': "無料",
            'Subscription': "サブスクリプション"
        }
    },
    "Korean": {
        cancel: "취소",
        pricing: "가격 책정",
        categories: {
            'Business OS': "비즈니스 OS",
            'Data & Intelligence': "데이터 및 인텔리전스",
            'Sales & Marketing': "영업 및 마케팅",
            'HR & Finance': "인사 및 재무",
            'Design & Creative': "디자인 및 크리에이티브",
            'Medical & Health AI': "의료 및 건강 AI",
            'general': "일반"
        },
        pricingOptions: {
            'Free': "무료",
            'Subscription': "구독"
        }
    },
    "Bengali": {
        cancel: "বাতিল করুন",
        pricing: "মূল্য নির্ধারণ",
        categories: {
            'Business OS': "বিজনেস ওএস",
            'Data & Intelligence': "ডেটা এবং ইন্টেলিজেন্স",
            'Sales & Marketing': "সেলস এবং মার্কেটিং",
            'HR & Finance': "এইচআর এবং ফিন্যান্স",
            'Design & Creative': "ডিজাইন এবং ক্রিয়েটিভ",
            'Medical & Health AI': "মেডিকেল এবং হেলথ এআই",
            'general': "সাধারণ"
        },
        pricingOptions: {
            'Free': "ফ্রি",
            'Subscription': "সাবস্ক্রিপশন"
        }
    },
    "Marathi": {
        cancel: "रद्द करा",
        pricing: "किंमत",
        categories: {
            'Business OS': "बिझनेस ओएस",
            'Data & Intelligence': "डेटा आणि इंटेलिजन्स",
            'Sales & Marketing': "विक्री आणि विपणन",
            'HR & Finance': "एचआर आणि वित्त",
            'Design & Creative': "डिझाइन आणि क्रिएटिव्ह",
            'Medical & Health AI': "वैद्यकीय आणि आरोग्य एआय",
            'general': "सामान्य"
        },
        pricingOptions: {
            'Free': "मोफत",
            'Subscription': "सबस्क्रिप्शन"
        }
    },
    "Telugu": {
        cancel: "రద్దు చేయి",
        pricing: "ధర",
        categories: {
            'Business OS': "బిజినెస్ OS",
            'Data & Intelligence': "డేటా & ఇంటెลิజెన్స్",
            'Sales & Marketing': "సేల్స్ & మార్కెటింగ్",
            'HR & Finance': "HR & ఫైనాన్స్",
            'Design & Creative': "డిజైన్ & క్రియేటివ్",
            'Medical & Health AI': "మెడికల్ & హెల్త్ AI",
            'general': "సాధారణం"
        },
        pricingOptions: {
            'Free': "ఉచితం",
            'Subscription': "సబ్‌స్క్రిప్షన్"
        }
    },
    "Turkish": {
        cancel: "İptal",
        pricing: "Fiyatlandırma",
        categories: {
            'Business OS': "İşletme İşletim Sistemi",
            'Data & Intelligence': "Veri ve Zeka",
            'Sales & Marketing': "Satış ve Pazarlama",
            'HR & Finance': "İK ve Finans",
            'Design & Creative': "Tasarım ve Kreatif",
            'Medical & Health AI': "Tıbbi ve Sağlık Yapay Zekası",
            'general': "Genel"
        },
        pricingOptions: {
            'Free': "Ücretsiz",
            'Subscription': "Abonelik"
        }
    },
    "Tamil": {
        cancel: "ரத்து செய்",
        pricing: "விலை",
        categories: {
            'Business OS': "பிசினஸ் ஓஎஸ்",
            'Data & Intelligence': "தரவு மற்றும் நுண்ணறிவு",
            'Sales & Marketing': "விற்பனை மற்றும் சந்தைப்படுத்தல்",
            'HR & Finance': "எச்ஆர் மற்றும் நிதி",
            'Design & Creative': "வடிவமைப்பு மற்றும் படைப்பாற்றல்",
            'Medical & Health AI': "மருத்துவ மற்றும் சுகாதார AI",
            'general': "பொதுவானது"
        },
        pricingOptions: {
            'Free': "இலவசம்",
            'Subscription': "சந்தா"
        }
    },
    "Kannada": {
        cancel: "ರದ್ದುಮಾಡು",
        pricing: "ಬೆಲೆ",
        categories: {
            'Business OS': "ಬಿಸಿನೆಸ್ ಓಎಸ್",
            'Data & Intelligence': "ಡೇಟಾ ಮತ್ತು ಇಂಟೆಲಿಜೆನ್ಸ್",
            'Sales & Marketing': "ಮಾರಾಟ ಮತ್ತು ಮಾರ್ಕೆಟಿಂಗ್",
            'HR & Finance': "ಎಚ್‌ಆರ್ ಮತ್ತು ಫೈನಾನ್ಸ್",
            'Design & Creative': "ವಿನ್ಯಾಸ ಮತ್ತು ಸೃಜನಶೀಲತೆ",
            'Medical & Health AI': "ವೈದ್ಯಕೀಯ ಮತ್ತು ಆರೋಗ್ಯ ಎಐ",
            'general': "ಸಾಮಾನ್ಯ"
        },
        pricingOptions: {
            'Free': "ಉಚಿತ",
            'Subscription': "ಚಂದಾದารಿಕೆ"
        }
    },
    "Malayalam": {
        cancel: "റദ്ദാക്കുക",
        pricing: "വില",
        categories: {
            'Business OS': "ബിസിനസ് ഒഎസ്",
            'Data & Intelligence': "ഡാറ്റയും ഇൻ്റലിജൻസും",
            'Sales & Marketing': "സെയിൽസ് & മാർക്കറ്റിംഗ്",
            'HR & Finance': "എച്ച്ആർ & ഫിനാൻസ്",
            'Design & Creative': "ഡിസൈൻ & クリエイティブ",
            'Medical & Health AI': "മെഡിക്കൽ & ഹെൽത്ത് AI",
            'general': "ജനറൽ"
        },
        pricingOptions: {
            'Free': "സൗജന്യമാണ്",
            'Subscription': "സബ്സ്ക്രിപ്ഷൻ"
        }
    },
    "Italian": {
        cancel: "Annulla",
        pricing: "Prezzi",
        categories: {
            'Business OS': "OS Aziendale",
            'Data & Intelligence': "Dati e Intelligenza",
            'Sales & Marketing': "Vendite e Marketing",
            'HR & Finance': "RU e Finanza",
            'Design & Creative': "Design e Creatività",
            'Medical & Health AI': "IA Medica e Sanitaria",
            'general': "Generale"
        },
        pricingOptions: {
            'Free': "Gratuito",
            'Subscription': "Abbonamento"
        }
    },
    "Dutch": {
        cancel: "Annuleren",
        pricing: "Prijzen",
        categories: {
            'Business OS': "Zakelijk OS",
            'Data & Intelligence': "Gegevens en Intelligentie",
            'Sales & Marketing': "Verkoop en Marketing",
            'HR & Finance': "HR en Financiën",
            'Design & Creative': "Ontwerp en Creativiteit",
            'Medical & Health AI': "Medische en Gezondheids-AI",
            'general': "Algemeen"
        },
        pricingOptions: {
            'Free': "Gratis",
            'Subscription': "Abonnement"
        }
    },
    "Urdu": {
        cancel: "منسوخ کریں",
        pricing: "قیمتوں کا تعین",
        categories: {
            'Business OS': "بزنس OS",
            'Data & Intelligence': "ڈیٹا اور انٹیلی جنس",
            'Sales & Marketing': "سیلز اور مارکیٹنگ",
            'HR & Finance': "HR اور فنانس",
            'Design & Creative': "ڈیزائن اور تخلیقی",
            'Medical & Health AI': "میڈیکل اور ہیلتھ AI",
            'general': "عام"
        },
        pricingOptions: {
            'Free': "مفت",
            'Subscription': "سبسکرپشن"
        }
    },
    "Gujarati": {
        cancel: "રદ કરો",
        pricing: "કિંમત",
        categories: {
            'Business OS': "બિઝનેસ ઓએસ",
            'Data & Intelligence': "ડેટા અને ઇન્ટેલિજન્સ",
            'Sales & Marketing': "વેચાણ અને માર્કેટિંગ",
            'HR & Finance': "એચઆર અને ફાઇનાન્સ",
            'Design & Creative': "ડિઝાઇન અને ક્રિએટિવ",
            'Medical & Health AI': "મેડિકલ અને હેલ્થ એઆઈ",
            'general': "સામાન્ય"
        },
        pricingOptions: {
            'Free': "મફત",
            'Subscription': "સબ્સ્ક્રિપ્શન"
        }
    },
    "Polish": {
        cancel: "Anuluj",
        pricing: "Cennik",
        categories: {
            'Business OS': "Firmowy system operacyjny",
            'Data & Intelligence': "Dane i Inteligencja",
            'Sales & Marketing': "Sprzedaż i Marketing",
            'HR & Finance': "HR i Finanse",
            'Design & Creative': "Projektowanie i Kreacja",
            'Medical & Health AI': "Sztuczna Inteligencja w Medycynie i Zdrowiu",
            'general': "Ogólne"
        },
        pricingOptions: {
            'Free': "Bezpłatnie",
            'Subscription': "Subskrypcja"
        }
    },
    "Swedish": {
        cancel: "Avbryt",
        pricing: "Prissättning",
        categories: {
            'Business OS': "Företags-OS",
            'Data & Intelligence': "Data och Intelligens",
            'Sales & Marketing': "Försäljning och Marknadsföring",
            'HR & Finance': "HR och Ekonomi",
            'Design & Creative': "Design och Kreativitet",
            'Medical & Health AI': "Medicinsk och Hälso-AI",
            'general': "Allmänt"
        },
        pricingOptions: {
            'Free': "Gratis",
            'Subscription': "Prenumeration"
        }
    },
    "Vietnamese": {
        cancel: "Hủy",
        pricing: "Giá cả",
        categories: {
            'Business OS': "Hệ điều hành doanh nghiệp",
            'Data & Intelligence': "Dữ liệu & Trí tuệ",
            'Sales & Marketing': "Bán hàng & Tiếp thị",
            'HR & Finance': "Nhân sự & Tài chính",
            'Design & Creative': "Thiết kế & Sáng tạo",
            'Medical & Health AI': "AI Y tế & Sức khỏe",
            'general': "Chung"
        },
        pricingOptions: {
            'Free': "Miễn phí",
            'Subscription': "Gói thuê bao"
        }
    },
    "Thai": {
        cancel: "ยกเลิก",
        pricing: "ราคา",
        categories: {
            'Business OS': "ระบบปฏิบัติการธุรกิจ",
            'Data & Intelligence': "ข้อมูลและข่าวกรอง",
            'Sales & Marketing': "การขายและการตลาด",
            'HR & Finance': "HR และการเงิน",
            'Design & Creative': "การออกแบบและสร้างสรรค์",
            'Medical & Health AI': "AI ทางการแพทย์และสุขภาพ",
            'general': "ทั่วไป"
        },
        pricingOptions: {
            'Free': "ฟรี",
            'Subscription': "การสมัครสมาชิก"
        }
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
            const data = extraTranslations[capturingLang];

            if (data) {
                blockStr = blockStr.replace(/createModal: \{([\s\S]+?)\}/, (match, p1) => {
                    let inner = p1.trim();
                    if (!inner.includes('categories:')) {
                        inner += `,\n                        pricing: "${data.pricing}",\n                        cancel: "${data.cancel}",\n                        categories: ${JSON.stringify(data.categories, null, 4).replace(/\n/g, '\n                        ')},\n                        pricingOptions: ${JSON.stringify(data.pricingOptions, null, 4).replace(/\n/g, '\n                        ')}`;
                    }
                    return `createModal: {\n                        ${inner}\n                    }`;
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
console.log('SUCCESS: Injected missing translations for Create Agent modal for 26 languages.');
