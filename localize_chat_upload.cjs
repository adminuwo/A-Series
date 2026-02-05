const fs = require('fs');
const targetFile = 'g:/A_Series/A-Series/src/context/LanguageContext.jsx';

const localizedData = {
    "English": { camera: "Camera & Scan", upload: "Upload files", drive: "Add from Drive" },
    "Hindi": { camera: "कैमरा और स्कैन", upload: "फाइलें अपलोड करें", drive: "ड्राइव से जोड़ें" },
    "Spanish": { camera: "Cámara y escaneo", upload: "Subir archivos", drive: "Agregar desde Drive" },
    "French": { camera: "Appareil photo et numérisation", upload: "Télécharger des fichiers", drive: "Ajouter depuis Drive" },
    "German": { camera: "Kamera & Scan", upload: "Dateien hochladen", drive: "Von Drive hinzufügen" },
    "Arabic": { camera: "الكاميرا والمسح الضوئي", upload: "تحميل الملفات", drive: "إضافة من درايف" },
    "Mandarin Chinese": { camera: "相机与扫描", upload: "上传文件", drive: "从云端硬盘添加" },
    "Portuguese": { camera: "Câmera e digitalização", upload: "Fazer upload de arquivos", drive: "Adicionar do Drive" },
    "Russian": { camera: "Камера и сканирование", upload: "Загрузить файлы", drive: "Добавить из Диска" },
    "Japanese": { camera: "カメラとスキャン", upload: "ファイルをアップロード", drive: "ドライブから追加" },
    "Korean": { camera: "카메라 및 스캔", upload: "파일 업로드", drive: "드라이브에서 추가" },
    "Bengali": { camera: "ক্যামেরা এবং স্ক্যান", upload: "ফাইল আপলোড করুন", drive: "ড্রাইভ থেকে যোগ করুন" },
    "Marathi": { camera: "कॅमेरा आणि स्कॅन", upload: "फायली अपलोड करा", drive: "ड्राइव्हवरून जोडा" },
    "Telugu": { camera: "కెమెరా & స్కాన్", upload: "ఫైళ్లను అప్‌లోడ్ చేయండి", drive: "డ్రైవ్ నుండి జోడించండి" },
    "Turkish": { camera: "Kamera ve Tarama", upload: "Dosyaları yükle", drive: "Drive'dan ekle" },
    "Tamil": { camera: "கேமரா மற்றும் ஸ்கேன்", upload: "கோப்புகளைப் பதிவேற்றவும்", drive: "டிரைவிலிருந்து சேர்க்கவும்" },
    "Kannada": { camera: "ಕ್ಯಾಮೆರಾ ಮತ್ತು ಸ್ಕ್ಯಾನ್", upload: "ಫೈಲ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ", drive: "ಡ್ರೈವ್‌ನಿಂದ ಸೇರಿಸಿ" },
    "Malayalam": { camera: "ക്യാമറയും സ്കാനും", upload: "ഫയലുകൾ അപ്‌ലോഡ് ചെയ്യുക", drive: "ഡ്രൈവിൽ നിന്ന് ചേർക്കുക" },
    "Italian": { camera: "Fotocamera e scansione", upload: "Carica file", drive: "Aggiungi da Drive" },
    "Dutch": { camera: "Camera & scannen", upload: "Bestanden uploaden", drive: "Toevoegen vanaf Drive" },
    "Urdu": { camera: "کیمرہ اور اسکین", upload: "فائلیں اپ لوڈ کریں", drive: "ڈرائیو سے شامل کریں" },
    "Gujarati": { camera: "કેમેરા અને સ્કેન", upload: "ફાઇલો અપલોડ કરો", drive: "ડ્રાઇવમાંથી ઉમેરો" },
    "Polish": { camera: "Aparat i skanowanie", upload: "Prześlij pliki", drive: "Dodaj z Dysku" },
    "Swedish": { camera: "Kamera och skanning", upload: "Ladda upp filer", drive: "Lägg till från Drive" },
    "Vietnamese": { camera: "Máy ảnh & Quét", upload: "Tải lên tệp", drive: "Thêm từ Drive" },
    "Thai": { camera: "กล้องและสแกน", upload: "อัปโหลดไฟล์", drive: "เพิ่มจากไดรฟ์" }
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
                // Update chatPage to include new keys
                blockStr = blockStr.replace(/chatPage: \{([\s\S]+?)\}/, (match, p1) => {
                    let inner = p1.trim();
                    if (!inner.includes('cameraScan')) {
                        inner += `,\n                cameraScan: "${data.camera}",\n                uploadFiles: "${data.upload}",\n                addFromDrive: "${data.drive}"`;
                    }
                    return `chatPage: {\n                ${inner}\n            }`;
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
console.log('SUCCESS: Localized chat upload menu for 26 languages.');
