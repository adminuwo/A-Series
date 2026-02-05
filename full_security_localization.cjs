const fs = require('fs');
const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';

// Function to generate the 12-section security guidelines object
function getSecurityGuidelines(lang, strings) {
    return {
        pageTitle: strings.pageTitle,
        lastUpdated: strings.lastUpdated,
        intro: strings.intro,
        section1: {
            title: strings.s1Title,
            mainText: strings.s1Main,
            sub1Title: strings.s1Sub1Title,
            sub1Text: strings.s1Sub1Text,
            sub2Title: strings.s1Sub2Title,
            sub2Text: strings.s1Sub2Text,
            sub3Title: strings.s1Sub3Title,
            sub3Text: strings.s1Sub3Text
        },
        section2: {
            title: strings.s2Title,
            mainText: strings.s2Main,
            dataResidencyTitle: strings.s2DataRes,
            dataResidencyText: strings.s2DataResText,
            accessControlTitle: strings.s2Access,
            accessControlText: strings.s2AccessText
        },
        section3: {
            title: strings.s3Title,
            mainText: strings.s3Main,
            prohibitedItems: strings.s3Items,
            violationWarning: strings.s3Warning
        },
        section4: {
            title: strings.s4Title,
            sub1Title: strings.s4Sub1Title,
            sub1Text: strings.s4Sub1Text,
            sub2Title: strings.s4Sub2Title,
            sub2Text: strings.s4Sub2Text
        },
        section5: {
            title: strings.s5Title,
            text1: strings.s5Text1,
            text2: strings.s5Text2,
            text3: strings.s5Text3
        },
        section6: {
            title: strings.s6Title,
            text1: strings.s6Text1,
            text2: strings.s6Text2
        },
        section7: {
            title: strings.s7Title,
            text: strings.s7Text
        },
        section8: {
            title: strings.s8Title,
            license: strings.s8License,
            ownership: strings.s8Ownership,
            transfer: strings.s8Transfer
        },
        section9: {
            title: strings.s9Title,
            items: strings.s9Items
        },
        section10: {
            title: strings.s10Title,
            text: strings.s10Text
        },
        section11: {
            title: strings.s11Title,
            text: strings.s11Text
        },
        section12: {
            title: strings.s12Title,
            mainText: strings.s12Main,
            reportButton: strings.s12ReportLabel,
            reportButtonText: strings.s12ReportBtn,
            supportButton: strings.s12SupportLabel
        },
        legalSummaryTitle: strings.legalTitle,
        legalSummaryText: strings.legalText
    };
}

// I will define localized strings for a few representative languages and use a generator pattern for others
const localizedStrings = {
    "English": {
        pageTitle: "Security & Guidelines",
        lastUpdated: "Last Updated: 17/12/2025",
        intro: "This Security & Guidelines section governs the acceptable use, data protection practices, and security standards applicable to A-Series™.",
        s1Title: "1. Core Promise: 'Your Data is Yours'",
        s1Main: "A-Series™ operates under a strict \"Zero-Training\" policy.",
        s1Sub1Title: "1.1 Compliance with Indian Law (DPDP Act 2023)",
        s1Sub1Text: "We adhere to the Digital Personal Data Protection Act, 2023.",
        s1Sub2Title: "1.2 Right to be Forgotten",
        s1Sub2Text: "We will permanently delete your data within 30 days upon request.",
        s1Sub3Title: "1.3 Grievance Redressal",
        s1Sub3Text: "Our DPO handles complaints within 72 hours.",
        s2Title: "2. Technical Security (The 'Vertex Shield')",
        s2Main: "We leverage enterprise-grade security of Google Vertex AI.",
        s2DataRes: "Data Residency",
        s2DataResText: "Data stored in Google Cloud India regions.",
        s2Access: "Access Control",
        s2AccessText: "Strict IAM policies ensure privacy.",
        s3Title: "3. Acceptable Use Policy",
        s3Main: "We strictly prohibit:",
        s3Items: ["NSFW Content", "Hate Speech", "Deepfakes", "Political Campaigning"],
        s3Warning: "Violation results in account suspension.",
        s4Title: "4. AI Safety & Disclaimers",
        s4Sub1Title: "4.1 Hallucination Warning",
        s4Sub1Text: "AI models can generate incorrect info.",
        s4Sub2Title: "4.2 Watermarking",
        s4Sub2Text: "AI-generated media embed a digital watermark.",
        s5Title: "5. File Upload Security",
        s5Text1: "Files are processed solely for functionality.",
        s5Text2: "Restrictions apply to file size and type.",
        s5Text3: "Malicious files will be rejected.",
        s6Title: "6. Cookies",
        s6Text1: "Used for functionality and security.",
        s6Text2: "Manage via browser settings.",
        s7Title: "7. Third-Party Services",
        s7Text: "Governed by contracts and operational necessity.",
        s8Title: "8. Intellectual Property",
        s8License: "Limited access license.",
        s8Ownership: "All rights remain with A-Series™.",
        s8Transfer: "No transfer of ownership implies.",
        s9Title: "9. Enforcement",
        s9Items: ["Compliance monitoring", "Termination for violations"],
        s10Title: "10. Policy Updates",
        s10Text: "Modifications may occur at any time.",
        s11Title: "11. Contact Info",
        s11Text: "For questions or requests, contact support.",
        s12Title: "12. Incident Reporting & Support",
        s12Main: "If you witness any security violations, please report them.",
        s12ReportLabel: "Report in App:",
        s12ReportBtn: "Open Form",
        s12SupportLabel: "Support:",
        legalTitle: "🧠 Legal Summary",
        legalText: "\"These guidelines establish the framework for lawful use and security.\""
    },
    // I will add Japanese as it's already well-translated in my mind
    "Japanese": {
        pageTitle: "セキュリティとガイドライン",
        lastUpdated: "最終更新日: 2025/12/17",
        intro: "このセキュリティとガイドラインセクションは、UWO™が運営するA-Series™に適用される許容される使用方法、データ保護慣行、およびセキュリティ基準を規定します。",
        s1Title: "1. 中心となる約束：「あなたのデータはあなたのもの」",
        s1Main: "A-Series™は厳格な「ゼロトレーニング」ポリシーの下で運営されています。",
        s1Sub1Title: "1.1 インド法（DPDP法2023）への準拠",
        s1Sub1Text: "2023年デジタル個人データ保護法を遵守しています。",
        s1Sub2Title: "1.2 忘れられる権利",
        s1Sub2Text: "要求に応じて、30日以内にデータを完全に削除します。",
        s1Sub3Title: "1.3 苦情処理",
        s1Sub3Text: "当社のDPOは、72時間以内に苦情を処理します。",
        s2Title: "2. 技術的セキュリティ（「Vertex Shield」）",
        s2Main: "Google Vertex AIのエンタープライズグレードのセキュリティを活用しています。",
        s2DataRes: "データの所在",
        s2DataResText: "Google Cloud Indiaリージョンに保存されます。",
        s2Access: "アクセス制御",
        s2AccessText: "厳格なIAMポリシーによりプライバシーを確保します。",
        s3Title: "3. 許容される使用ポリシー",
        s3Main: "以下の行為を厳格に禁止します。",
        s3Items: ["NSFWコンテンツ", "ヘイトスピーチ", "ディープフェイク", "政治キャンペーン"],
        s3Warning: "違反した場合、アカウントが停止されます。",
        s4Title: "4. AIセキュリティと免責事項",
        s4Sub1Title: "4.1 ハルシネーション警告",
        s4Sub1Text: "AIモデルは誤った情報を生成することがあります。",
        s4Sub2Title: "4.2 ウォーターマーク",
        s4Sub2Text: "AI生成メディアにはデジタルウォーターマークが埋め込まれます。",
        s5Title: "5. ファイルアップロードのセキュリティ",
        s5Text1: "ファイルは機能提供の目的でのみ処理されます。",
        s5Text2: "ファイルサイズや種類に制限が適用されます。",
        s5Text3: "悪意のあるファイルは拒否されます。",
        s6Title: "6. クッキー",
        s6Text1: "機能とセキュリティのために使用されます。",
        s6Text2: "ブラウザ設定で管理可能です。",
        s7Title: "7. サードパーティサービス",
        s7Text: "契約と運用の必要性によって規定されます。",
        s8Title: "8. 知的財産権",
        s8License: "限定的なアクセスライセンス。",
        s8Ownership: "すべての権利はA-Series™に帰属します。",
        s8Transfer: "所有権の譲渡を意味するものではありません。",
        s9Title: "9. 執行",
        s9Items: ["コンプライアンス監視", "違反による終了"],
        s10Title: "10. ポリシーの更新",
        s10Text: "変更は随時行われる可能性があります。",
        s11Title: "11. お問い合わせ先",
        s11Text: "質問やリクエストはサポートまで。",
        s12Title: "12. インシデント報告とサポート",
        s12Main: "セキュリティ違反を発見した場合は、直ちに報告してください。",
        s12ReportLabel: "アプリで報告：",
        s12ReportBtn: "フォームを開く",
        s12SupportLabel: "サポート：",
        legalTitle: "🧠 法的要約ステートメント",
        legalText: "「このガイドラインは、合法的な使用とセキュリティのための枠組みを確立するものです。」"
    },
    // I'll add Spanish
    "Spanish": {
        pageTitle: "Seguridad y Directrices",
        lastUpdated: "Última actualización: 17/12/2025",
        intro: "Esta sección de Seguridad y Directrices rige el uso aceptable, las prácticas de protección de datos y los estándares de seguridad aplicables a A-Series™.",
        s1Title: "1. Promesa central: 'Tus datos son tuyos'",
        s1Main: "A-Series™ opera bajo una estricta política de \"Cero Entrenamiento\".",
        s1Sub1Title: "1.1 Cumplimiento de la Ley India (Acta DPDP 2023)",
        s1Sub1Text: "Cumplimos con la Ley de Protección de Datos Personales Digitales de 2023.",
        s1Sub2Title: "1.2 Derecho al olvido",
        s1Sub2Text: "Eliminaremos permanentemente sus datos en un plazo de 30 días previa solicitud.",
        s1Sub3Title: "1.3 Resolución de quejas",
        s1Sub3Text: "Nuestro DPO maneja las quejas en un plazo de 72 horas.",
        s2Title: "2. Seguridad técnica (El 'Vertex Shield')",
        s2Main: "Aprovechamos la seguridad de grado empresarial de Google Vertex AI.",
        s2DataRes: "Residencia de datos",
        s2DataResText: "Datos almacenados en regiones de Google Cloud India.",
        s2Access: "Control de acceso",
        s2AccessText: "Políticas estrictas de IAM garantizan la privacidad.",
        s3Title: "3. Política de uso aceptable",
        s3Main: "Prohibimos estrictamente:",
        s3Items: ["Contenido NSFW", "Discurso de odio", "Deepfakes", "Campaña política"],
        s3Warning: "La violación resulta en la suspensión de la cuenta.",
        s4Title: "4. Seguridad de IA y descargos de responsabilidad",
        s4Sub1Title: "4.1 Advertencia de alucinaciones",
        s4Sub1Text: "Los modelos de IA pueden generar información incorrecta.",
        s4Sub2Title: "4.2 Marcas de agua",
        s4Sub2Text: "Los medios generados por IA incluyen una marca de agua digital.",
        s5Title: "5. Seguridad de carga de archivos",
        s5Text1: "Los archivos se procesan únicamente por funcionalidad.",
        s5Text2: "Se aplican restricciones al tamaño y tipo de archivo.",
        s5Text3: "Los archivos maliciosos serán rechazados.",
        s6Title: "6. Cookies",
        s6Text1: "Utilizadas para funcionalidad y seguridad.",
        s6Text2: "Administrar a través de la configuración del navegador.",
        s7Title: "7. Servicios de terceros",
        s7Text: "Regido por contratos y necesidad operativa.",
        s8Title: "8. Propiedad intelectual",
        s8License: "Licencia de acceso limitada.",
        s8Ownership: "Todos los derechos permanecen con A-Series™.",
        s8Transfer: "No implica transferencia de propiedad.",
        s9Title: "9. Ejecución",
        s9Items: ["Monitoreo de cumplimiento", "Terminación por violaciones"],
        s10Title: "10. Actualizaciones de política",
        s10Text: "Pueden ocurrir modificaciones en cualquier momento.",
        s11Title: "11. Información de contacto",
        s11Text: "Para preguntas o solicitudes, contacte al soporte.",
        s12Title: "12. Informe de incidentes y soporte",
        s12Main: "Si presencia alguna violación de seguridad, infórmela de inmediato.",
        s12ReportLabel: "Reportar en la aplicación:",
        s12ReportBtn: "Abrir formulario",
        s12SupportLabel: "Soporte:",
        legalTitle: "🧠 Declaración de resumen legal",
        legalText: "\"Estas directrices establecen el marco para el uso legal y la seguridad.\""
    }
};

// I will create a script that ONLY updates English, Japanese, and Spanish for now to verify.
// Then I will do a massive one for all 26 if the user likes it.

const content_lines = content.replace(/\r/g, '').split('\n');
let outputLines = [];
let inTranslations = false;
let capturingLang = null;
let braceDepth = 0;
let currentLangBlock = [];

for (let i = 0; i < content_lines.length; i++) {
    const line = content_lines[i];

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
            const strings = localizedStrings[capturingLang];

            if (strings) {
                const guidelines = getSecurityGuidelines(capturingLang, strings);
                const guidelinesStr = JSON.stringify(guidelines, null, 20).replace(/^/gm, '    ');

                // Replace securityGuidelines section
                blockStr = blockStr.replace(/securityGuidelines: \{[\s\S]+?\}(,\n|\n)?\s+(contactUs|trustSafety|reportIssue)/, (match, p1, p2, p3) => {
                    return `securityGuidelines: ${JSON.stringify(guidelines, null, 20)}${p1}${p2}`;
                });

                // If the regex above failed because it was the last or something, fallback
                if (!blockStr.includes(`pageTitle: "${strings.pageTitle}"`)) {
                    // Manual surgical replacement if needed, but the regex should work for most
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

// Write the result
// fs.writeFileSync(targetFile, outputLines.join('\n'));
console.log('Test complete. I should use a more precise replacement logic for 26 languages.');
