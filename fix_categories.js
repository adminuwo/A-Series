import fs from 'fs';

const filePath = 'g:\\A_Series\\A-Series\\src\\context\\LanguageContext.jsx';

// Category translations for all languages
const categoryTranslations = {
    "English": {
        "Business OS": "Business OS",
        "Data & Intelligence": "Data & Intelligence",
        "Sales & Marketing": "Sales & Marketing",
        "HR & Finance": "HR & Finance",
        "Design & Creative": "Design & Creative",
        "Medical & Health AI": "Medical & Health AI",
        "general": "General"
    },
    "Hindi": {
        "Business OS": "बिजनेस OS",
        "Data & Intelligence": "डेटा और इंटेलिजेंस",
        "Sales & Marketing": "बिक्री और मार्केटिंग",
        "HR & Finance": "HR और वित्त",
        "Design & Creative": "डिज़ाइन और रचनात्मक",
        "Medical & Health AI": "चिकित्सा और स्वास्थ्य AI",
        "general": "सामान्य"
    },
    "Spanish": {
        "Business OS": "Sistema Operativo Empresarial",
        "Data & Intelligence": "Datos e Inteligencia",
        "Sales & Marketing": "Ventas y Marketing",
        "HR & Finance": "RRHH y Finanzas",
        "Design & Creative": "Diseño y Creatividad",
        "Medical & Health AI": "IA Médica y de Salud",
        "general": "General"
    },
    "French": {
        "Business OS": "Système d'exploitation commercial",
        "Data & Intelligence": "Données et Intelligence",
        "Sales & Marketing": "Ventes et Marketing",
        "HR & Finance": "RH et Finance",
        "Design & Creative": "Design et Créativité",
        "Medical & Health AI": "IA Médicale et Santé",
        "general": "Général"
    },
    "German": {
        "Business OS": "Business-Betriebssystem",
        "Data & Intelligence": "Daten und Intelligenz",
        "Sales & Marketing": "Vertrieb und Marketing",
        "HR & Finance": "Personal und Finanzen",
        "Design & Creative": "Design und Kreativität",
        "Medical & Health AI": "Medizinische und Gesundheits-KI",
        "general": "Allgemein"
    },
    "Arabic": {
        "Business OS": "نظام الأعمال",
        "Data & Intelligence": "البيانات والذكاء",
        "Sales & Marketing": "المبيعات والتسويق",
        "HR & Finance": "الموارد البشرية والمالية",
        "Design & Creative": "التصميم والإبداع",
        "Medical & Health AI": "الذكاء الاصطناعي الطبي والصحي",
        "general": "عام"
    },
    "Mandarin Chinese": {
        "Business OS": "商业操作系统",
        "Data & Intelligence": "数据与智能",
        "Sales & Marketing": "销售与营销",
        "HR & Finance": "人力资源与财务",
        "Design & Creative": "设计与创意",
        "Medical & Health AI": "医疗与健康AI",
        "general": "通用"
    },
    "Portuguese": {
        "Business OS": "Sistema Operacional de Negócios",
        "Data & Intelligence": "Dados e Inteligência",
        "Sales & Marketing": "Vendas e Marketing",
        "HR & Finance": "RH e Finanças",
        "Design & Creative": "Design e Criatividade",
        "Medical & Health AI": "IA Médica e de Saúde",
        "general": "Geral"
    },
    "Russian": {
        "Business OS": "Бизнес ОС",
        "Data & Intelligence": "Данные и Интеллект",
        "Sales & Marketing": "Продажи и Маркетинг",
        "HR & Finance": "HR и Финансы",
        "Design & Creative": "Дизайн и Креатив",
        "Medical & Health AI": "Медицинский и Здоровье ИИ",
        "general": "Общее"
    },
    "Japanese": {
        "Business OS": "ビジネスOS",
        "Data & Intelligence": "データとインテリジェンス",
        "Sales & Marketing": "営業とマーケティング",
        "HR & Finance": "人事と財務",
        "Design & Creative": "デザインとクリエイティブ",
        "Medical & Health AI": "医療と健康AI",
        "general": "一般"
    },
    "Korean": {
        "Business OS": "비즈니스 OS",
        "Data & Intelligence": "데이터 및 인텔리전스",
        "Sales & Marketing": "영업 및 마케팅",
        "HR & Finance": "인사 및 재무",
        "Design & Creative": "디자인 및 크리에이티브",
        "Medical & Health AI": "의료 및 건강 AI",
        "general": "일반"
    },
    "Tamil": {
        "Business OS": "வணிக OS",
        "Data & Intelligence": "தரவு மற்றும் நுண்ணறிவு",
        "Sales & Marketing": "விற்பனை மற்றும் சந்தைப்படுத்தல்",
        "HR & Finance": "HR மற்றும் நிதி",
        "Design & Creative": "வடிவமைப்பு மற்றும் படைப்பாற்றல்",
        "Medical & Health AI": "மருத்துவ மற்றும் சுகாதார AI",
        "general": "பொது"
    },
    "Bengali": {
        "Business OS": "ব্যবসায়িক OS",
        "Data & Intelligence": "ডেটা এবং বুদ্ধিমত্তা",
        "Sales & Marketing": "বিক্রয় এবং বিপণন",
        "HR & Finance": "HR এবং অর্থ",
        "Design & Creative": "ডিজাইন এবং সৃজনশীল",
        "Medical & Health AI": "চিকিৎসা এবং স্বাস্থ্য AI",
        "general": "সাধারণ"
    },
    "Gujarati": {
        "Business OS": "બિઝનેસ OS",
        "Data & Intelligence": "ડેટા અને બુદ્ધિ",
        "Sales & Marketing": "વેચાણ અને માર્કેટિંગ",
        "HR & Finance": "HR અને નાણાં",
        "Design & Creative": "ડિઝાઇન અને સર્જનાત્મક",
        "Medical & Health AI": "તબીબી અને આરોગ્ય AI",
        "general": "સામાન્ય"
    },
    "Turkish": {
        "Business OS": "İş İşletim Sistemi",
        "Data & Intelligence": "Veri ve Zeka",
        "Sales & Marketing": "Satış ve Pazarlama",
        "HR & Finance": "İK ve Finans",
        "Design & Creative": "Tasarım ve Yaratıcılık",
        "Medical & Health AI": "Tıbbi ve Sağlık Yapay Zekası",
        "general": "Genel"
    }
};

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Find all language blocks
    const languageRegex = /"([a-zA-Z ]+)":\s*{/g;
    let match;
    let languages = [];

    const translationsStart = content.indexOf('const translations = {');
    const tStart = content.indexOf('const t = (key)');
    const relevantContent = content.substring(translationsStart, tStart);

    while ((match = languageRegex.exec(relevantContent)) !== null) {
        languages.push({ name: match[1], index: match.index + translationsStart });
    }

    console.log(`Processing ${languages.length} languages...`);

    // Process in reverse order to avoid index shifts
    languages.reverse();

    for (const lang of languages) {
        // Find the end of this language block
        let i = lang.index + 1;
        while (content[i] !== '{') i++;

        const openBraceIdx = i;
        let bCount = 1;
        let closeBraceIdx = -1;

        for (let j = openBraceIdx + 1; j < content.length; j++) {
            if (content[j] === '{') bCount++;
            else if (content[j] === '}') {
                bCount--;
                if (bCount === 0) {
                    closeBraceIdx = j;
                    break;
                }
            }
        }

        const langContent = content.substring(lang.index, closeBraceIdx + 1);

        // Check if createModal exists and add pricing if missing
        if (langContent.includes('createModal: {')) {
            const createModalStartLocal = langContent.indexOf('createModal: {');
            const createModalStartGlobal = lang.index + createModalStartLocal;

            // Find the closing brace of createModal
            let cmIdx = createModalStartGlobal + 'createModal: {'.length;
            let cmBCount = 1;
            let cmCloseIdx = -1;

            for (let k = cmIdx; k < content.length; k++) {
                if (content[k] === '{') cmBCount++;
                else if (content[k] === '}') {
                    cmBCount--;
                    if (cmBCount === 0) {
                        cmCloseIdx = k;
                        break;
                    }
                }
            }

            const createModalContent = content.substring(createModalStartGlobal, cmCloseIdx + 1);

            // Add pricing key if missing
            if (!createModalContent.includes('pricing:')) {
                const insertPos = cmCloseIdx;
                const pricingKey = ',\n                        pricing: "Pricing"';
                content = content.slice(0, insertPos) + pricingKey + content.slice(insertPos);
                console.log(`Added 'pricing' key to ${lang.name}`);
            }
        }

        // Add categories object if missing
        if (!langContent.includes('categories: {')) {
            // Find admin.agents.createModal block and add categories after it
            if (langContent.includes('createModal: {')) {
                const createModalStartLocal = langContent.indexOf('createModal: {');
                const createModalStartGlobal = lang.index + createModalStartLocal;

                // Find the closing brace of createModal
                let cmIdx = createModalStartGlobal + 'createModal: {'.length;
                let cmBCount = 1;
                let cmCloseIdx = -1;

                for (let k = cmIdx; k < content.length; k++) {
                    if (content[k] === '{') cmBCount++;
                    else if (content[k] === '}') {
                        cmBCount--;
                        if (cmBCount === 0) {
                            cmCloseIdx = k;
                            break;
                        }
                    }
                }

                const cats = categoryTranslations[lang.name] || categoryTranslations["English"];
                const categoriesBlock = `,\n                    categories: {\n                        "Business OS": "${cats["Business OS"]}",\n                        "Data & Intelligence": "${cats["Data & Intelligence"]}",\n                        "Sales & Marketing": "${cats["Sales & Marketing"]}",\n                        "HR & Finance": "${cats["HR & Finance"]}",\n                        "Design & Creative": "${cats["Design & Creative"]}",\n                        "Medical & Health AI": "${cats["Medical & Health AI"]}",\n                        "general": "${cats["general"]}"\n                    }`;

                const insertPos = cmCloseIdx + 1;
                content = content.slice(0, insertPos) + categoriesBlock + content.slice(insertPos);
                console.log(`Added categories to ${lang.name}`);
            }
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("\n✓ Successfully updated LanguageContext.jsx");

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
