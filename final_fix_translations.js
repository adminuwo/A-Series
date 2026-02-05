import fs from 'fs';

const filePath = 'g:\\A_Series\\A-Series\\src\\context\\LanguageContext.jsx';
const content = fs.readFileSync(filePath, 'utf8');

const baseTranslations = {
    myTransactions: "My Transactions",
    transactionsDesc: "View your purchase history and payment details",
    date: "Date",
    appAgent: "App / Agent",
    plan: "Plan",
    amount: "Amount",
    status: "Status",
    actions: "Actions",
    details: "Details",
    loadingTransactions: "Loading transactions...",
    noTransactions: "No transactions found yet.",
    subscribeToSeeHistory: "Subscribe to an agent to see your purchase history here.",
    transactionDetails: "Transaction Details",
    transactionId: "Transaction ID",
    amountPaid: "Amount Paid",
    totalAmount: "Total Amount",
    paymentStatus: "Payment Status",
    close: "Close",
    success: "Success",
    pending: "Pending",
    adminRole: "Admin",
    userRole: "User",
    developerRole: "Developer",
    accountType: "Account Type",
    showAll: "Show All",
    hideAll: "Hide All",
    confirmNewPassword: "Confirm new password",
    confirmPassword: "Confirm Password",
    enterNewPassword: "Enter new password",
    newPassword: "New Password",
    enterCurrentPassword: "Enter current password",
    currentPassword: "Current Password",
    failedToUpdate: "Failed to update",
    passwordUpdated: "Password updated successfully",
    updatingPassword: "Updating password...",
    passwordMismatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 6 characters",
    failedToDelete: "Failed to delete account",
    accountDeleted: "Account deleted successfully",
    deletingAccount: "Deleting account...",
    deletionConfirmation: "Are you sure you want to delete your account? This action is permanent."
};

const localized = {
    "Hindi": {
        myTransactions: "मेरे लेन-देन",
        transactionsDesc: "अपना खरीदारी इतिहास और भुगतान विवरण देखें",
        date: "तारीख",
        appAgent: "ऐप / एजेंट",
        plan: "योजना",
        amount: "राशि",
        status: "स्थिति",
        actions: "कार्रवाई",
        details: "विवरण",
        loadingTransactions: "लेन-देन लोड हो रहा है...",
        noTransactions: "अभी तक कोई लेन-देन नहीं मिला।",
        subscribeToSeeHistory: "अपना खरीदारी इतिहास यहां देखने के लिए किसी एजेंट की सदस्यता लें।",
        transactionDetails: "लेन-देन का विवरण",
        transactionId: "लेन-देन आईडी",
        amountPaid: "भुगतान की गई राशि",
        totalAmount: "कुल राशि",
        paymentStatus: "भुगतान की स्थिति",
        close: "बंद करें",
        success: "सफल",
        pending: "लंबित",
        adminRole: "एडमिन",
        userRole: "उपयोगकर्ता",
        developerRole: "डेवलपर",
        accountType: "खाता प्रकार",
        showAll: "सभी दिखाएं",
        hideAll: "सभी छुपाएं",
        confirmNewPassword: "नए पासवर्ड की पुष्टि करें",
        confirmPassword: "पासवर्ड की पुष्टि करें",
        enterNewPassword: "नया पासवर्ड दर्ज करें",
        newPassword: "नया पासवर्ड",
        enterCurrentPassword: "वर्तमान पासवर्ड दर्ज करें",
        currentPassword: "वर्तमान पासवर्ड",
        failedToUpdate: "अपडेट करने में विफल",
        passwordUpdated: "पासवर्ड सफलतापूर्वक अपडेट किया गया",
        updatingPassword: "पासवर्ड अपडेट किया जा रहा है...",
        passwordMismatch: "पासवर्ड मेल नहीं खाते",
        passwordTooShort: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए",
        failedToDelete: "खाता हटाने में विफल",
        accountDeleted: "खाता सफलतापूर्वक हटा दिया गया",
        deletingAccount: "खाता हटाया जा रहा है...",
        deletionConfirmation: "क्या आप वाकई अपना खाता हटाना चाहते हैं? यह कार्रवाई स्थायी है।"
    }
};

let lines = content.split('\n');
let currentLang = null;
let updatedLines = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Detect start of language block
    const langMatch = line.match(/^\s*"([^"]+)":\s*{/);
    if (langMatch && line.includes('": {') && !line.includes('timezoneKeywords')) {
        currentLang = langMatch[1];
    }

    // Detect end of language block (assuming it ends with "},")
    if (currentLang && line.match(/^\s*},\s*$/)) {
        // Inject keys before closing the block
        const trans = localized[currentLang] || baseTranslations;
        Object.entries(trans).forEach(([key, val]) => {
            // Check if key already exists in the block (simple check)
            let exists = false;
            for (let j = updatedLines.length - 1; j >= 0; j--) {
                if (updatedLines[j].match(/^\s*"([^"]+)":\s*{/)) break; // Reached start of block
                if (updatedLines[j].includes(`${key}:`)) {
                    // Update existing key if it's currently English and we have a localized version
                    if (localized[currentLang] && localized[currentLang][key]) {
                        updatedLines[j] = updatedLines[j].replace(/: ".*"/, `: "${localized[currentLang][key]}"`);
                    }
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                updatedLines.push(`            ${key}: "${val}",`);
            }
        });
        currentLang = null;
    }

    updatedLines.push(line);
}

fs.writeFileSync(filePath, updatedLines.join('\n'));
console.log("Global keys update complete with selective Hindi localization.");
