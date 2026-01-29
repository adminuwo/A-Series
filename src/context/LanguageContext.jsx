import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [region, setRegion] = useState(localStorage.getItem('user-region') || 'India');
    const [language, setLanguage] = useState(localStorage.getItem('user-language') || 'English');

    useEffect(() => {
        localStorage.setItem('user-region', region);
    }, [region]);

    useEffect(() => {
        localStorage.setItem('user-language', language);
    }, [language]);

    const regions = {
        'India': [
            "English",
            "Hindi",
            "Bengali",
            "Telugu",
            "Marathi",
            "Tamil",
            "Urdu",
            "Gujarati",
            "Kannada",
            "Malayalam",
            "Odia",
            "Punjabi",
            "Assamese",
            "Maithili",
            "Sanskrit",
            "Konkani",
            "Nepali",
            "Sindhi",
            "Dogri",
            "Kashmiri",
            "Santali",
            "Bodo",
            "Manipuri"
        ]
    };

    const regionFlags = {
        'India': 'IN'
    };

    const regionTimezones = {
        'India': 'India (GMT+5:30)'
    };

    const allTimezones = [
        "International Date Line West (GMT-12:00)",
        "Samoa Standard Time (GMT-11:00)",
        "Hawaii-Aleutian Standard Time (GMT-10:00)",
        "Alaska Standard Time (GMT-9:00)",
        "Pacific Standard Time (GMT-8:00)",
        "Mountain Standard Time (GMT-7:00)",
        "Central Standard Time (GMT-6:00)",
        "Eastern Standard Time (GMT-5:00)",
        "Atlantic Standard Time (GMT-4:00)",
        "Brasília Time (GMT-3:00)",
        "South Georgia Time (GMT-2:00)",
        "Azores Time (GMT-1:00)",
        "Greenwich Mean Time (GMT+0:00)",
        "Central European Time (GMT+1:00)",
        "Eastern European Time (GMT+2:00)",
        "Moscow Time (GMT+3:00)",
        "Gulf Standard Time (GMT+4:00)",
        "India Standard Time (GMT+5:30)",
        "Bangladesh Standard Time (GMT+6:00)",
        "Indochina Time (GMT+7:00)",
        "China Standard Time (GMT+8:00)",
        "Japan Standard Time (GMT+9:00)",
        "Australian Eastern Time (GMT+10:00)",
        "Solomon Islands Time (GMT+11:00)",
        "New Zealand Time (GMT+12:00)"
    ];

    const languages = [].concat(...Object.values(regions));
    const uniqueLanguages = [...new Set(languages)];

    const translations = {
        "English": {
            displayLanguage: "Display Language",
            dashboard: "Dashboard",
            chat: "Chat",
            myAgents: "My Agents",
            marketplace: "Marketplace",
            vendorDashboard: "Vendor Dashboard",
            billing: "Billing",
            adminDashboard: "Admin Dashboard",
            updates: "Updates",
            helpFaq: "Help & FAQ",
            logOut: "Log Out",
            joined: "Joined December 2025",
            securityBtn: "Security & Guidelines",
            totalSessions: "Total Sessions",
            proFeatures: "Pro Features",
            accountSettings: "Account Settings",
            credits: "Credits",
            accountPreferences: "Account Preferences",
            timezone: "Timezone",
            currency: "Currency",
            theme: "Theme",
            securityStatus: "Security Status",
            accountSecure: "Account fully secure",
            twoFactor: "Two-Factor Authentication",
            enabled: "Enabled",
            manage: "Manage",
            signOut: "Sign Out from Device",
            // Profile Page
            accountOverview: "Account Overview",
            accountType: "Account Type",
            user: "User",
            notifications: "Notifications",
            emailNotifications: "Email Notifications",
            pushNotifications: "Push Notifications",
            receiveUpdates: "Receive updates",
            countryRegionLanguage: "Country/Region & Language",
            displayTheme: "Display Theme",
            password: "Password",
            changePassword: "Change Password",
            billingPayments: "Billing & Payments",
            transactions: "Transactions",
            deleteAccount: "Delete Account",
            currentPassword: "Current Password",
            newPassword: "New Password",
            confirmPassword: "Confirm Password",
            enterCurrentPassword: "Enter current password",
            enterNewPassword: "Enter new password",
            confirmNewPassword: "Confirm new password",
            cancel: "Cancel",
            update: "Update",
            save: "Save",
            edit: "Edit",
            showAll: "Show All",
            hideAll: "Hide All",
            // Navbar
            hi: "Hi",
            profile: "Profile",
            logout: "Logout",
            menu: "Menu",
            // Common UI
            loading: "Loading...",
            comingSoon: "Coming soon...",
            yes: "Yes",
            no: "No",
            confirm: "Confirm",
            close: "Close",
            submit: "Submit",
            // Toast Messages
            profileUpdated: "Profile updated successfully!",
            passwordUpdated: "Password updated successfully!",
            avatarUploaded: "Profile picture updated successfully!",
            settingSaved: "Setting saved successfully!",
            accountDeleted: "Account deleted successfully.",
            sessionExpired: "Session expired. Please log in again.",
            invalidFile: "Invalid file format",
            fileTooLarge: "Image size should be less than 50MB",
            loginRequired: "Please log in to upload a profile picture",
            passwordMismatch: "New passwords do not match!",
            passwordTooShort: "Password must be at least 6 characters.",
            deletionConfirmation: "Are you SURE you want to delete your account? This action is permanent and will delete all your chats and data.",
            failedToUpdate: "Failed to update",
            failedToSave: "Failed to save setting",
            failedToDelete: "Failed to delete account. Please try again.",
            updatingPassword: "Updating password...",
            updatingProfile: "Updating profile...",
            uploadingAvatar: "Uploading avatar...",
            deletingAccount: "Deleting account...",
            disabled: "Disabled",
            light: "Light",
            dark: "Dark",
            lightMode: "Light Mode",
            darkMode: "Dark Mode"
        },
        "Hindi": {
            displayLanguage: "प्रदर्शित भाषा",
            dashboard: "डैशबोर्ड",
            chat: "चैट",
            myAgents: "मेरे एजेंट",
            marketplace: "मार्केटप्लेस",
            vendorDashboard: "विक्रेता डैशबोर्ड",
            billing: "बिलिंग",
            adminDashboard: "व्यवस्थापक डैशबोर्ड",
            updates: "अपडेट",
            helpFaq: "सहायता और FAQ",
            logOut: "लॉग आउट",
            joined: "दिसंबर 2025 को शामिल हुए",
            securityBtn: "सुरक्षा और दिशानिर्देश",
            totalSessions: "कुल सत्र",
            proFeatures: "प्रो सुविधाएँ",
            accountSettings: "खाता सेटिंग्स",
            credits: "क्रेडिट",
            accountPreferences: "खाता प्राथमिकताएं",
            timezone: "समय क्षेत्र",
            currency: "मुद्रा",
            theme: "थीम",
            securityStatus: "सुरक्षा स्थिति",
            accountSecure: "खाता पूरी तरह से सुरक्षित है",
            twoFactor: "दो-चरणीय प्रमाणीकरण",
            enabled: "सक्षम",
            manage: "प्रबंधित करें",
            signOut: "साइन आउट करें",
            // Profile Page
            accountOverview: "खाता विवरण",
            accountType: "खाता प्रकार",
            user: "उपयोगकर्ता",
            notifications: "सूचनाएं",
            emailNotifications: "ईमेल सूचनाएं",
            pushNotifications: "पुश सूचनाएं",
            receiveUpdates: "अपडेट प्राप्त करें",
            countryRegionLanguage: "देश/क्षेत्र और भाषा",
            displayTheme: "प्रदर्शन थीम",
            password: "पासवर्ड",
            changePassword: "पासवर्ड बदलें",
            billingPayments: "बिलिंग और भुगतान",
            transactions: "लेनदेन",
            deleteAccount: "खाता हटाएं",
            currentPassword: "वर्तमान पासवर्ड",
            newPassword: "नया पासवर्ड",
            confirmPassword: "पासवर्ड की पुष्टि करें",
            enterCurrentPassword: "वर्तमान पासवर्ड दर्ज करें",
            enterNewPassword: "नया पासवर्ड दर्ज करें",
            confirmNewPassword: "नए पासवर्ड की पुष्टि करें",
            cancel: "रद्द करें",
            update: "अपडेट करें",
            save: "सहेजें",
            edit: "संपादित करें",
            showAll: "सभी दिखाएं",
            hideAll: "सभी छिपाएं",
            // Navbar
            hi: "नमस्ते",
            profile: "प्रोफ़ाइल",
            logout: "लॉगआउट",
            menu: "मेनू",
            // Common UI
            loading: "लोड हो रहा है...",
            comingSoon: "जल्द आ रहा है...",
            yes: "हाँ",
            no: "नहीं",
            confirm: "पुष्टि करें",
            close: "बंद करें",
            submit: "सबमिट करें",
            // Toast Messages
            profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!",
            passwordUpdated: "पासवर्ड सफलतापूर्वक अपडेट किया गया!",
            avatarUploaded: "प्रोफ़ाइल चित्र सफलतापूर्वक अपडेट किया गया!",
            settingSaved: "सेटिंग सफलतापूर्वक सहेजी गई!",
            accountDeleted: "खाता सफलतापूर्वक हटा दिया गया।",
            sessionExpired: "सत्र समाप्त हो गया। कृपया फिर से लॉग इन करें।",
            invalidFile: "अमान्य फ़ाइल प्रारूप",
            fileTooLarge: "छवि का आकार 50MB से कम होना चाहिए",
            loginRequired: "प्रोफ़ाइल चित्र अपलोड करने के लिए कृपया लॉग इन करें",
            passwordMismatch: "नए पासवर्ड मेल नहीं खाते!",
            passwordTooShort: "पासवर्ड कम से कम 6 वर्ण का होना चाहिए।",
            deletionConfirmation: "क्या आप निश्चित रूप से अपना खाता हटाना चाहते हैं? यह कार्रवाई स्थायी है और आपकी सभी चैट और डेटा हटा देगी।",
            failedToUpdate: "अपडेट करने में विफल",
            failedToSave: "सेटिंग सहेजने में विफल",
            failedToDelete: "खाता हटाने में विफल। कृपया पुनः प्रयास करें।",
            updatingPassword: "पासवर्ड अपडेट हो रहा है...",
            updatingProfile: "प्रोफ़ाइल अपडेट हो रही है...",
            uploadingAvatar: "अवतार अपलोड हो रहा है...",
            deletingAccount: "खाता हटाया जा रहा है...",
            disabled: "अक्षम",
            light: "हल्का",
            dark: "गहरा",
            lightMode: "लाइट मोड",
            darkMode: "डार्क मोड"
        },
        
        
        
        
        
        
        
        
        "Bengali": {
            displayLanguage: "প্রদর্শন ভাষা",
            dashboard: "ড্যাশবোর্ড",
            chat: "চ্যাট",
            myAgents: "আমার এজেন্ট",
            marketplace: "মার্কেটপ্লেস",
            vendorDashboard: "ভেন্ডর ড্যাশবোর্ড",
            billing: "বিলিং",
            adminDashboard: "অ্যাডমিন ড্যাশবোর্ড",
            updates: "আপডেট",
            helpFaq: "সহায়তা এবং FAQ",
            logOut: "লগ আউট",
            joined: "ডিসেম্বর ২০২৫ এ যোগদান করেছেন",
            securityBtn: "নিরাপত্তা ও নির্দেশিকা",
            totalSessions: "মোট সেশন",
            proFeatures: "প্রো বৈশিষ্ট্য",
            accountSettings: "অ্যাকাউন্ট সেটিংস",
            credits: "ক্রেডিট",
            accountPreferences: "অ্যাকাউন্ট পছন্দসমূহ",
            timezone: "সময় অঞ্চল",
            currency: "মুদ্রা",
            theme: "থিম",
            securityStatus: "নিরাপত্তা অবস্থা",
            accountSecure: "অ্যাকাউন্ট সম্পূর্ণ নিরাপদ",
            twoFactor: "টু-ফ্যাক্টর অথেন্টিকেশন",
            enabled: "সক্রিয়",
            manage: "পরিচালনা করুন",
            signOut: "সাইন আউট করুন"
        },
        "Marathi": {
            displayLanguage: "प्रदर्शित भाषा",
            dashboard: "डॅशबोर्ड",
            chat: "चॅट",
            myAgents: "माझे एजंट",
            marketplace: "मार्केटप्लेस",
            vendorDashboard: "विक्रेता डॅशबोर्ड",
            billing: "बिलिंग",
            adminDashboard: "प्रशासक डॅशबोर्ड",
            updates: "अपडेट्स",
            helpFaq: "मदत आणि FAQ",
            logOut: "लॉग आउट",
            joined: "डिसेंबर २०२५ मध्ये सामील झाले",
            securityBtn: "सुरक्षा आणि मार्गदर्शक तत्वे",
            totalSessions: "एकूण सत्रे",
            proFeatures: "प्रो वैशिष्ट्ये",
            accountSettings: "खाते सेटिंग्ज",
            credits: "क्रेडिट्स",
            accountPreferences: "खाते पसंती",
            timezone: "वेळ क्षेत्र",
            currency: "चलन",
            theme: "थीम",
            securityStatus: "सुरक्षा स्थिती",
            accountSecure: "खाते पूर्णपणे सुरक्षित आहे",
            twoFactor: "द्वि-घटक प्रमाणीकरण",
            enabled: "सक्षम",
            manage: "व्यवस्थापित करा",
            signOut: "साइन आउट करा"
        },
        "Telugu": {
            displayLanguage: "ప్రదర్శన భాష",
            dashboard: "డాష్‌బోర్డ్",
            chat: "చాట్",
            myAgents: "నా ఏజెంట్లు",
            marketplace: "మార్కెట్‌ప్లేస్",
            vendorDashboard: "విక్రేత డాష్‌బోర్డ్",
            billing: "బిల్లింగ్",
            adminDashboard: "అడ్మిన్ డాష్‌బోర్డ్",
            updates: "నవీకరణలు",
            helpFaq: "సహాయం & ప్రశ్నలు",
            logOut: "లాగ్ అవుట్",
            joined: "డిసెంబర్ 2025లో చేరారు",
            securityBtn: "భద్రత & మార్గదర్శకాలు",
            totalSessions: "మొత్తం సెషన్లు",
            proFeatures: "ప్రో ఫీచర్లు",
            accountSettings: "ఖాతా సెట్టింగ్‌లు",
            credits: "క్రెడిట్స్",
            accountPreferences: "ఖాతా ప్రాధాన్యతలు",
            timezone: "సమయ క్షేత్రం",
            currency: "కరెన్సీ",
            theme: "థీమ్",
            securityStatus: "భద్రతా స్థితి",
            accountSecure: "ఖాతా పూర్తిగా సురక్షితం",
            twoFactor: "రెండు-కారకాల ప్రమాణీకరణ",
            enabled: "ప్రారంభించబడింది",
            manage: "నిర్వహించండి",
            signOut: "సైన్ అవుట్ చేయండి"
        },
        
        "Tamil": {
            displayLanguage: "காட்சி மொழி",
            dashboard: "முகப்பு",
            chat: "அரட்டை",
            myAgents: "என் முகவர்கள்",
            marketplace: "சந்தை",
            vendorDashboard: "விற்பனையாளர் முகப்பு",
            billing: "பில்லிங்",
            adminDashboard: "நிர்வாக முகப்பு",
            updates: "புதுப்பிப்புகள்",
            helpFaq: "உதவி & கேள்விகள்",
            logOut: "வெளியேறு",
            joined: "டிசம்பர் 2025 இல் இணைந்தார்",
            securityBtn: "பாதுகாப்பு & வழிகாட்டுதல்கள்",
            totalSessions: "மொத்த அமர்வுகள்",
            proFeatures: "ப்ரோ அம்சங்கள்",
            accountSettings: "கணக்கு அமைப்புகள்",
            credits: "க्रेडिटస్",
            accountPreferences: "கணக்கு விருப்பங்கள்",
            timezone: "நேர மண்டலம்",
            currency: "நாணயம்",
            theme: "தீம்",
            securityStatus: "பாதுகாப்பு நிலை",
            accountSecure: "கணக்கு முழுமையாக பாதுகாப்பானது",
            twoFactor: "இரண்டு காரணி அங்கீகாரம்",
            enabled: "இயக்கப்பட்டது",
            manage: "நிர்வகி",
            signOut: "வெளியேறு"
        },
        "Kannada": {
            displayLanguage: "ಪ್ರದರ್ಶನ ಭಾಷೆ",
            dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            chat: "ಚಾಟ್",
            myAgents: "ನನ್ನ ಏಜೆಂಟ್‌ಗಳು",
            marketplace: "ಮಾರುಕಟ್ಟೆ",
            vendorDashboard: "ಮಾರಾಟಗಾರರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            billing: "ಬಿಲ್ಲಿಂಗ್",
            adminDashboard: "ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            updates: "ನವೀಕರಣಗಳು",
            helpFaq: "ಸಹಾಯ ಮತ್ತು FAQ",
            logOut: "ಲಾಗ್ ಔಟ್",
            joined: "ಡಿಸೆಂಬರ್ 2025 ರಂದು ಸೇರಿದ್ದಾರೆ",
            securityBtn: "ಭದ್ರತೆ ಮತ್ತು ಮಾರ್ಗಸೂಚಿಗಳು",
            totalSessions: "ಒಟ್ಟು ಸೆಷನ್‌ಗಳು",
            proFeatures: "ಪ್ರೊ ವೈಶಿಷ್ಟ್ಯಗಳು",
            accountSettings: "ಖಾತೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
            credits: "ಕ್ರೆಡಿಟ್ಸ್",
            accountPreferences: "ಖಾತೆ ಆದ್ಯತೆಗಳು",
            timezone: "ಸಮಯ ವಲಯ",
            currency: "ಕರೆನ್ಸಿ",
            theme: "ಥೀಮ್",
            securityStatus: "ಭದ್ರತಾ ಸ್ಥితి",
            accountSecure: "ಖಾತೆ ಸಂಪೂರ್ಣವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿದೆ",
            twoFactor: "ದ್ವಿ-ಅಂಶ ದೃಢೀಕರಣ",
            enabled: "ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
            manage: "ನಿರ್ವಹಿಸಿ",
            signOut: "ಸೈನ್ ಔಟ್"
        },
        "Malayalam": {
            displayLanguage: "ಪ್ರದರ್ಶನ ಭಾಷೆ",
            dashboard: "ഡാഷ്‌ബോർഡ്",
            chat: "ചാറ്റ്",
            myAgents: "എന്റെ ഏജന്റുകൾ",
            marketplace: "മാർക്കറ്റ് പ്ലേസ്",
            vendorDashboard: "വെണ്ടർ ഡാഷ്‌ബോർഡ്",
            billing: "ബില്ലിംഗ്",
            adminDashboard: "അഡ്മിൻ ഡാഷ്‌ബോർഡ്",
            updates: "അപ്‌ഡേറ്റുകൾ",
            helpFaq: "സഹായം & FAQ",
            logOut: "ലോഗ് ഔട്ട്",
            joined: "2025 ഡിസംബറിൽ ചേർന്നു",
            securityBtn: "സുരക്ഷയും മാർഗ്ഗനിർദ്ദേശങ്ങളും",
            totalSessions: "ആകെ സെഷനുകൾ",
            proFeatures: "ప్రో ఫీచర్లు",
            accountSettings: "అക്കൗണ്ട് ക്രമീകരണങ്ങൾ",
            credits: "ക്രെഡിറ്റുകൾ",
            accountPreferences: "അക്കൗണ്ട് മുൻഗണനകൾ",
            timezone: "സമയ മേഖല",
            currency: "കറൻസി",
            theme: "തീം",
            securityStatus: "സുരക്ഷാ നില",
            accountSecure: "അക്കൗണ്ട് പൂർണ്ണമായും സുരക്ഷിതമാണ്",
            twoFactor: "ടു-ഫാക്ടർ ഓതന്റിക്കേഷൻ",
            enabled: "പ്രവർത്തനക്ഷമമാക്കി",
            manage: "നിയന്ത്രിക്കുക",
            signOut: "സൈൻ ഔട്ട്"
        },
        
        
        "Urdu": {
            displayLanguage: "نمایاں زبان",
            dashboard: "ڈیش بورڈ",
            chat: "چیٹ",
            myAgents: "میرے ایجنٹس",
            marketplace: "مارکیٹ پلیس",
            vendorDashboard: "وینڈر ڈیش بورڈ",
            billing: "بلنگ",
            adminDashboard: "ایڈمن ڈیش بورڈ",
            updates: "اپ ڈیٹس",
            helpFaq: "مدد اور سوالات",
            logOut: "لاگ آؤٹ",
            joined: "دسمبر 2025 میں شامل ہوئے",
            securityBtn: "سیکیورٹی اور رہنما اصول",
            totalSessions: "کل سیشنز",
            proFeatures: "پرو خصوصیات",
            accountSettings: "اکاؤنٹ کی ترتیبات",
            credits: "کریڈٹ",
            accountPreferences: "اکاؤنٹ کی ترجیحات",
            timezone: "ٹائم زون",
            currency: "کرنسی",
            theme: "تھیم",
            securityStatus: "سیکیورٹی کی صورتحال",
            accountSecure: "اکاؤنٹ مکمل طور پر محفوظ ہے",
            twoFactor: "دو قدمی تصدیق",
            enabled: "فعال",
            manage: "انتظام کریں",
            signOut: "سائن آؤٹ"
        }
,

        "Gujarati": {

            displayLanguage: "પ્રદર્શન ભાષા",

            dashboard: "ડેશબોર્ડ",

            chat: "ચેટ",

            myAgents: "મારા એજન્ટ્સ",

            marketplace: "માર્કેટપ્લેસ",

            vendorDashboard: "વિક્રેતા ડેશબોર્ડ",

            billing: "બિલિંગ",

            adminDashboard: "એડમિન ડેશબોર્ડ",

            updates: "અપડેટ્સ",

            helpFaq: "મદદ અને FAQ",

            logOut: "લૉગ આઉટ",

            accountOverview: "એકાઉન્ટ વિહંગાવલોકન",

            accountType: "એકાઉન્ટ પ્રકાર",

            user: "વપરાશકર્તા",

            notifications: "સૂચનાઓ",

            countryRegionLanguage: "દેશ/પ્રદેશ અને ભાષા",

            displayTheme: "પ્રદર્શન થીમ",

            password: "પાસવર્ડ",

            changePassword: "પાસવર્ડ બદલો",

            currentPassword: "વર્તમાન પાસવર્ડ",

            newPassword: "નવો પાસવર્ડ",

            confirmPassword: "પાસવર્ડની પુષ્ટિ કરો",

            enterCurrentPassword: "વર્તમાન પાસવર્ડ દાખલ કરો",

            enterNewPassword: "નવો પાસવર્ડ દાખલ કરો",

            confirmNewPassword: "નવા પાસવર્ડની પુષ્ટિ કરો",

            cancel: "રદ કરો",

            update: "અપડેટ કરો",

            save: "સાચવો",

            edit: "સંપાદિત કરો",

            showAll: "બધા બતાવો",

            hideAll: "બધા છુપાવો",

            hi: "નમસ્તે",

            profile: "પ્રોફાઇલ",

            logout: "લોગઆઉટ",

            menu: "મેનુ",

            enabled: "સક્ષમ",

            disabled: "અક્ષમ",

            twoFactor: "બે-પરિબળ પ્રમાણીકરણ",

            manage: "મેનેજ કરો",

            signOut: "સાઇન આઉટ",

            light: "પ્રકાશ",

            dark: "અંધારું",

            lightMode: "લાઇટ મોડ",

            darkMode: "ડાર્ક મોડ"

        },

        "Punjabi": {

            displayLanguage: "ਪ੍ਰਦਰਸ਼ਨ ਭਾਸ਼ਾ",

            dashboard: "ਡੈਸ਼ਬੋਰਡ",

            chat: "ਚੈਟ",

            myAgents: "ਮੇਰੇ ਏਜੰਟ",

            marketplace: "ਮਾਰਕੀਟਪਲੇਸ",

            vendorDashboard: "ਵਿਕਰੇਤਾ ਡੈਸ਼ਬੋਰਡ",

            billing: "ਬਿਲਿੰਗ",

            adminDashboard: "ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ",

            updates: "ਅੱਪਡੇਟ",

            helpFaq: "ਮਦਦ ਅਤੇ FAQ",

            logOut: "ਲੌਗ ਆਉਟ",

            accountOverview: "ਖਾਤਾ ਸੰਖੇਪ",

            accountType: "ਖਾਤਾ ਕਿਸਮ",

            user: "ਵਰਤੋਂਕਾਰ",

            notifications: "ਸੂਚਨਾਵਾਂ",

            countryRegionLanguage: "ਦੇਸ਼/ਖੇਤਰ ਅਤੇ ਭਾਸ਼ਾ",

            displayTheme: "ਪ੍ਰਦਰਸ਼ਨ ਥੀਮ",

            password: "ਪਾਸਵਰਡ",

            changePassword: "ਪਾਸਵਰਡ ਬਦਲੋ",

            currentPassword: "ਮੌਜੂਦਾ ਪਾਸਵਰਡ",

            newPassword: "ਨਵਾਂ ਪਾਸਵਰਡ",

            confirmPassword: "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",

            enterCurrentPassword: "ਮੌਜੂਦਾ ਪਾਸਵਰਡ ਦਾਖਲ ਕਰੋ",

            enterNewPassword: "ਨਵਾਂ ਪਾਸਵਰਡ ਦਾਖਲ ਕਰੋ",

            confirmNewPassword: "ਨਵੇਂ ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",

            cancel: "ਰੱਦ ਕਰੋ",

            update: "ਅੱਪਡੇਟ ਕਰੋ",

            save: "ਸੁਰੱਖਿਅਤ ਕਰੋ",

            edit: "ਸੰਪਾਦਿਤ ਕਰੋ",

            showAll: "ਸਾਰੇ ਦਿਖਾਓ",

            hideAll: "ਸਾਰੇ ਲੁਕਾਓ",

            hi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",

            profile: "ਪ੍ਰੋਫਾਈਲ",

            logout: "ਲੌਗਆਉਟ",

            menu: "ਮੀਨੂ",

            enabled: "ਸਮਰੱਥ",

            disabled: "ਅਸਮਰੱਥ",

            twoFactor: "ਦੋ-ਕਾਰਕ ਪ੍ਰਮਾਣੀਕਰਨ",

            manage: "ਪ੍ਰਬੰਧਨ ਕਰੋ",

            signOut: "ਸਾਈਨ ਆਉਟ",

            light: "ਰੌਸ਼ਨੀ",

            dark: "ਹਨੇਰਾ",

            lightMode: "ਲਾਈਟ ਮੋਡ",

            darkMode: "ਡਾਰਕ ਮੋਡ"

        },

        "Maithili": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },

        "Sanskrit": { displayLanguage: "प्रदर्शन भाषा", dashboard: "नियंत्रण पट्टिका", chat: "संवाद", password: "कूटशब्द", enabled: "सक्षम", disabled: "अक्षम" },

        "Konkani": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },

        "Nepali": { displayLanguage: "प्रदर्शन भाषा", dashboard: "ड्यासबोर्ड", chat: "कुराकानी", password: "पासवर्ड", enabled: "सक्षम", disabled: "अक्षम" },

        "Sindhi": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },

        "Dogri": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },

        "Kashmiri": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },

        "Santali": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },

        "Bodo": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },

        "Manipuri": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },
        "Odia": { displayLanguage: "ପ୍ରଦର୍ଶନ ଭାଷା", dashboard: "ଡ୍ୟାସବୋର୍ଡ", chat: "ଚାଟ୍", password: "ପାସୱାର୍ଡ", enabled: "ସକ୍ଷମ", disabled: "ଅକ୍ଷମ" },
        "Assamese": { displayLanguage: "প্ৰদৰ্শন ভাষা", dashboard: "ডেছব'ৰ্ড", chat: "চেট", password: "পাছৱৰ্ড", enabled: "সামৰ্থবান", disabled: "অসামৰ্থবান" }


    };

    const t = (key) => {
        const langData = translations[language] || translations['English'];
        return langData[key] || translations['English'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, languages: uniqueLanguages, region, setRegion, regions, regionFlags, allTimezones, regionTimezones }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
