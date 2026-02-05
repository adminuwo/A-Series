const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const authKeys = {
    // Login
    "auth.welcomeBack": {
        "english": "Welcome Back",
        "hindi": "वापसी पर स्वागत है",
        "spanish": "Bienvenido de nuevo",
        "french": "Bon retour",
        "arabic": "مرحبًا بعودتك",
        "bengali": "ফিরে আসার জন্য স্বাগতম",
        "marathi": "परत स्वागत आहे",
        "gujarati": "પાછા સ્વાગત છે",
        "tamil": "மீண்டும் வருக",
        "telugu": "తిరిగి స్వాగతం"
    },
    "auth.signInSubtitle": {
        "english": "Sign in to continue to A-Series™",
        "hindi": "A-Series™ पर जारी रखने के लिए साइन इन करें",
        "spanish": "Inicia sesión para continuar en A-Series™",
        "french": "Connectez-vous pour continuer vers A-Series™",
        "arabic": "تسجيل الدخول للمتابعة إلى A-Series™",
        "bengali": "A-Series™ এ চালিয়ে যেতে সাইন ইন করুন",
        "marathi": "A-Series™ वर चालू ठेवण्यासाठी साइन इन करा",
        "gujarati": "A-Series™ પર ચાલુ રાખવા માટે સાઇન ઇન કરો",
        "tamil": "A-Series™ ஐத் தொடர உள்நுழையவும்",
        "telugu": "A-Series™ కు కొనసాగడానికి సైన్ ఇన్ చేయండి"
    },
    "auth.email": {
        "english": "Email Address",
        "hindi": "ईमेल पता",
        "spanish": "Correo electrónico",
        "french": "Adresse e-mail",
        "arabic": "عنوان البريد الإلكتروني",
        "bengali": "ইমেল ঠিকানা",
        "marathi": "ईमेल पत्ता",
        "gujarati": "ઇમેઇલ સરનામું",
        "tamil": "மின்னஞ்சல் முகவரி",
        "telugu": "ఇమెయిల్ చిరునామా"
    },
    "auth.password": {
        "english": "Password",
        "hindi": "पासवर्ड",
        "spanish": "Contraseña",
        "french": "Mot de passe",
        "arabic": "كلمة المرور",
        "bengali": "পাসওয়ার্ড",
        "marathi": "पासवर्ड",
        "gujarati": "પાસવર્ડ",
        "tamil": "கடவுச்சொல்",
        "telugu": "పాస్‌వర్డ్"
    },
    "auth.forgotPassword": {
        "english": "Forgot Password?",
        "hindi": "पासवर्ड भूल गए?",
        "spanish": "¿Olvidaste tu contraseña?",
        "french": "Mot de passe oublié ?",
        "arabic": "هل نسيت كلمة المرور؟",
        "bengali": "পাসওয়ার্ড ভুলে গেছেন?",
        "marathi": "पासवर्ड विसरलात?",
        "gujarati": "પાસવર્ડ ભૂલી ગયા છો?",
        "tamil": "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
        "telugu": "పాస్‌వర్డ్ మర్చిపోయారా?"
    },
    "auth.signIn": {
        "english": "Sign In",
        "hindi": "साइन इन करें",
        "spanish": "Iniciar sesión",
        "french": "Se connecter",
        "arabic": "تسجيل الدخول",
        "bengali": "সাইন ইন করুন",
        "marathi": "साइन इन करा",
        "gujarati": "સાઇન ઇન કરો",
        "tamil": "உள்நுழையவும்",
        "telugu": "సైన్ ఇన్ చేయండి"
    },
    "auth.signingIn": {
        "english": "Signing In...",
        "hindi": "साइन इन हो रहा है...",
        "spanish": "Iniciando sesión...",
        "french": "Connexion en cours...",
        "arabic": "جاري تسجيل الدخول...",
        "bengali": "সাইন ইন করা হচ্ছে...",
        "marathi": "साइन इन करत आहे...",
        "gujarati": "સાઇન ઇન થઈ રહ્યું છે...",
        "tamil": "உள்நுழைகிறது...",
        "telugu": "సైన్ ఇన్ అవుతోంది..."
    },
    "auth.noAccount": {
        "english": "Don't have an account?",
        "hindi": "क्या आपका खाता नहीं है?",
        "spanish": "¿No tienes una cuenta?",
        "french": "Vous n'avez pas de compte ?",
        "arabic": "ليس لديك حساب؟",
        "bengali": "আপনার কি কোনো অ্যাকাউন্ট নেই?",
        "marathi": "खाते नाही?",
        "gujarati": "શું તમારી પાસે ખાતું નથી?",
        "tamil": "கணக்கு இல்லையா?",
        "telugu": "ఖాతా లేదా?"
    },
    "auth.createAccount": {
        "english": "Create Account",
        "hindi": "खाता बनाएं",
        "spanish": "Crear cuenta",
        "french": "Créer un compte",
        "arabic": "إنشاء حساب",
        "bengali": "অ্যাকাউন্ট তৈরি করুন",
        "marathi": "खाते तयार करा",
        "gujarati": "ખાતું બનાવો",
        "tamil": "கணக்கை உருவாக்கவும்",
        "telugu": "ఖాతాను సృష్టించండి"
    },
    "auth.backToHome": {
        "english": "Back to Home",
        "hindi": "होम पर वापस जाएं",
        "spanish": "Volver al inicio",
        "french": "Retour à l'accueil",
        "arabic": "العودة إلى الصفحة الرئيسية",
        "bengali": "হোমে ফিরে যান",
        "marathi": "मुख्यपृष्ठावर परत जा",
        "gujarati": "હોમ પર પાછા જાઓ",
        "tamil": "முகப்புக்குத் திரும்பு",
        "telugu": "హోమ్‌కు తిరిగి వెళ్ళు"
    },

    // Forgot Password
    "auth.otpSent": {
        "english": "Enter the OTP sent to",
        "hindi": "भेजा गया OTP दर्ज करें",
        "spanish": "Ingrese la OTP enviada a",
        "french": "Entrez l'OTP envoyé à",
        "arabic": "أدخل رمز OTP المرسل إلى",
        "bengali": "পাঠানো ওটিপি লিখুন",
        "marathi": "पाठवलेला ओटीपी प्रविष्ट करा",
        "gujarati": "મોકલેલ OTP દાખલ કરો",
        "tamil": "அனுப்பப்பட்ட OTP ஐ உள்ளிடவும்",
        "telugu": "పంపిన OTPని నమోదు చేయండి"
    },
    "auth.verifyOTP": {
        "english": "Verify OTP",
        "hindi": "OTP सत्यापित करें",
        "spanish": "Verificar OTP",
        "french": "Vérifier l'OTP",
        "arabic": "تحقق من OTP",
        "bengali": "ওটিপি যাচাই করুন",
        "marathi": "ओटीपी सत्यापित करा",
        "gujarati": "OTP ચકાસો",
        "tamil": "OTP ஐ சரிபார்க்கவும்",
        "telugu": "OTP ని ధృవీకరించండి"
    },
    "auth.resetPassword": {
        "english": "Reset Password",
        "hindi": "पासवर्ड रीसेट करें",
        "spanish": "Restablecer contraseña",
        "french": "Réinitialiser le mot de passe",
        "arabic": "إعادة تعيين كلمة المرور",
        "bengali": "পাসওয়ার্ড রিসেট করুন",
        "marathi": "पासवर्ड रीसेट करा",
        "gujarati": "પાસવર્ડ રીસેટ કરો",
        "tamil": "கடவுச்சொல்லை மீட்டமைக்கவும்",
        "telugu": "పాస్‌వర్డ్‌ను రీసెట్ చేయండి"
    },
    "auth.newPassword": {
        "english": "New Password",
        "hindi": "नया पासवर्ड",
        "spanish": "Nueva contraseña",
        "french": "Nouveau mot de passe",
        "arabic": "كلمة مرور جديدة",
        "bengali": "নতুন পাসওয়ার্ড",
        "marathi": "नवीन पासवर्ड",
        "gujarati": "નવો પાસવર્ડ",
        "tamil": "புதிய கடவுச்சொல்",
        "telugu": "కొత్త పాస్‌వర్డ్"
    },
    "auth.confirmPassword": {
        "english": "Confirm Password",
        "hindi": "पासवर्ड की पुष्टि करें",
        "spanish": "Confirmar contraseña",
        "french": "Confirmer le mot de passe",
        "arabic": "تأكيد كلمة المرور",
        "bengali": "পাসওয়ার্ড নিশ্চিত করুন",
        "marathi": "पासवर्ड निश्चित करा",
        "gujarati": "પાસવર્ડની પુષ્ટિ કરો",
        "tamil": "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
        "telugu": "పాస్‌వర్డ్‌ను నిర్ధారించండి"
    },
    "auth.sendOTP": {
        "english": "Send OTP",
        "hindi": "OTP भेजें",
        "spanish": "Enviar OTP",
        "french": "Envoyer l'OTP",
        "arabic": "إرسال OTP",
        "bengali": "ওটিপি পাঠান",
        "marathi": "ओटीपी पाठवा",
        "gujarati": "OTP મોકલો",
        "tamil": "OTP அனுப்பவும்",
        "telugu": "OTP పంపండి"
    },
    "auth.sendingOTP": {
        "english": "Sending OTP...",
        "hindi": "OTP भेजा जा रहा है...",
        "spanish": "Enviando OTP...",
        "french": "Envoi de l'OTP...",
        "arabic": "جاري إرسال OTP...",
        "bengali": "ওটিপি পাঠানো হচ্ছে...",
        "marathi": "ओटीपी पाठवत आहे...",
        "gujarati": "OTP મોકલી રહ્યું છે...",
        "tamil": "OTP அனுப்பப்படுகிறது...",
        "telugu": "OTP పంపబడుతోంది..."
    },
    "auth.verifying": {
        "english": "Verifying...",
        "hindi": "सत्यापन हो रहा है...",
        "spanish": "Verificando...",
        "french": "Vérification...",
        "arabic": "جاري التحقق...",
        "bengali": "যাচাই করা হচ্ছে...",
        "marathi": "सत्यापित करत आहे...",
        "gujarati": "ચકાસણી થઈ રહી છે...",
        "tamil": "சரிபார்க்கிறது...",
        "telugu": "ధృవీకరిస్తోంది..."
    },
    "auth.resetting": {
        "english": "Resetting...",
        "hindi": "रीसेट हो रहा है...",
        "spanish": "Restableciendo...",
        "french": "Réinitialisation...",
        "arabic": "جاري إعادة التعيين...",
        "bengali": "রিসেট করা হচ্ছে...",
        "marathi": "रीसेट करत आहे...",
        "gujarati": "રીસેટ થઈ રહ્યું છે...",
        "tamil": "மீட்டமைக்கிறது...",
        "telugu": "రీసెట్ చేస్తోంది..."
    },
    "auth.changeEmail": {
        "english": "Change Email",
        "hindi": "ईमेल बदलें",
        "spanish": "Cambiar correo",
        "french": "Changer d'e-mail",
        "arabic": "تغيير البريد الإلكتروني",
        "bengali": "ইমেল পরিবর্তন করুন",
        "marathi": "ईमेल बदल",
        "gujarati": "ઇમેઇલ બદલો",
        "tamil": "மின்னஞ்சலை மாற்றவும்",
        "telugu": "ఇమెయిల్ మార్చండి"
    },
    "auth.enterEmail": {
        "english": "Enter your email address and we'll send you an OTP to reset your password.",
        "hindi": "अपना ईमेल पता दर्ज करें और हम आपको पासवर्ड रीसेट करने के लिए एक OTP भेजेंगे।",
        "spanish": "Ingrese su dirección de correo y le enviaremos una OTP para restablecer su contraseña.",
        "french": "Entrez votre adresse e-mail et nous vous enverrons un OTP pour réinitialiser votre mot de passe.",
        "arabic": "أدخل عنوان بريدك الإلكتروني وسنرسل لك رمز OTP لإعادة تعيين كلمة مرورك.",
        "bengali": "আপনার ইমেল ঠিকানা লিখুন এবং আমরা আপনার পাসওয়ার্ড রিসেট করতে একটি ওটিপি পাঠাব।",
        "marathi": "तुमचा ईमेल पत्ता प्रविष्ट करा आणि आम्ही तुमचा पासवर्ड रीसेट करण्यासाठी तुम्हाला एक ओटीपी पाठवू.",
        "gujarati": "તમારું ઇમેઇલ સરનામું દાખલ કરો અને અમે તમને તમારો પાસવર્ડ રીસેટ કરવા માટે એક OTP મોકલીશું.",
        "tamil": "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும், கடவுச்சொல்லை மீட்டமைக்க நாங்கள் உங்களுக்கு ஒரு OTP ஐ அனுப்புவோம்.",
        "telugu": "మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి మరియు మీ పాస్‌వర్డ్‌ను రీసెట్ చేయడానికి మేము మీకు OTPని పంపుతాము."
    },
    "auth.createPassword": {
        "english": "Create a new password for your account.",
        "hindi": "अपने खाते के लिए नया पासवर्ड बनाएं।",
        "spanish": "Crea una nueva contraseña para tu cuenta.",
        "french": "Créez un nouveau mot de passe pour votre compte.",
        "arabic": "قم بإنشاء كلمة مرور جديدة لحسابك.",
        "bengali": "আপনার অ্যাকাউন্টের জন্য একটি নতুন পাসওয়ার্ড তৈরি করুন।",
        "marathi": "तुमच्या खात्यासाठी नवीन पासवर्ड तयार करा.",
        "gujarati": "તમારા ખાતા માટે નવો પાસવર્ડ બનાવો.",
        "tamil": "உங்கள் கணக்கிற்கு புதிய கடவுச்சொல்லை உருவாக்கவும்.",
        "telugu": "మీ ఖాతా కోసం కొత్త పాస్‌వర్డ్‌ను సృష్టించండి."
    },
    "auth.otpSentSuccess": {
        "english": "OTP Sent Successfully",
        "hindi": "OTP सफलतापूर्वक भेजा गया",
        "spanish": "OTP enviada con éxito",
        "french": "OTP envoyé avec succès",
        "arabic": "تم إرسال OTP بنجاح",
        "bengali": "ওটিপি সফলভাবে পাঠানো হয়েছে",
        "marathi": "ओटीपी यशस्वीरित्या पाठवला",
        "gujarati": "OTP સફળતાપૂર્વક મોકલવામાં આવ્યો",
        "tamil": "OTP வெற்றிகரமாக அனுப்பப்பட்டது",
        "telugu": "OTP విజయవంతంగా పంపబడింది"
    },
    "auth.otpVerifiedSuccess": {
        "english": "OTP Verified Successfully",
        "hindi": "OTP सफलतापूर्वक सत्यापित हुआ",
        "spanish": "OTP verificada con éxito",
        "french": "OTP vérifié avec succès",
        "arabic": "تم التحقق من OTP بنجاح",
        "bengali": "ওটিপি সফলভাবে যাচাই করা হয়েছে",
        "marathi": "ओटीपी यशस्वीरित्या सत्यापित",
        "gujarati": "OTP સફળતાપૂર્વક ચકાસાયેલ",
        "tamil": "OTP வெற்றிகரமாக சரிபார்க்கப்பட்டது",
        "telugu": "OTP విజయవంతంగా ధృవీకరించబడింది"
    },
    "auth.passwordResetSuccess": {
        "english": "Password Updated Successfully",
        "hindi": "पासवर्ड सफलतापूर्वक अपडेट किया गया",
        "spanish": "Contraseña actualizada exitosamente",
        "french": "Mot de passe mis à jour avec succès",
        "arabic": "تم تحديث كلمة المرور بنجاح",
        "bengali": "পাসওয়ার্ড সফলভাবে আপডেট হয়েছে",
        "marathi": "पासवर्ड यशस्वीरित्या अद्यतनित केला",
        "gujarati": "પાસવર્ડ સફળતાપૂર્વક અપડેટ થયો",
        "tamil": "கடவுச்சொல் வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
        "telugu": "పాస్‌వర్డ్ విజయవంతంగా నవీకరించబడింది"
    }
};

const languages = ["hindi", "bengali", "marathi", "gujarati", "tamil", "telugu", "arabic", "english", "french", "spanish"];

languages.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (!content.auth) content.auth = {};

            Object.keys(authKeys).forEach(key => {
                const parts = key.split('.');
                if (parts[0] === 'auth') {
                    const subKey = parts[1];
                    content.auth[subKey] = authKeys[key][lang] || authKeys[key]['english'];
                }
            });

            fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            console.log(`Updated auth keys in ${lang}.json`);
        } catch (e) {
            console.error(`Error updating ${lang}.json`, e);
        }
    }
});
