import fs from 'fs';

const filePath = 'g:\\A_Series\\A-Series\\src\\context\\LanguageContext.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const hindiTrans = {
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
};

const baseTrans = {
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

let languages = [];
lines.forEach((line, i) => {
    const match = line.match(/^\s*"([^"]+)":\s*{/);
    if (match && !line.includes('timezoneKeywords') && !line.includes('features') && !line.includes('policies')) {
        // Double check it has displayLanguage inside to be sure it's a main language block
        for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
            if (lines[j].includes('displayLanguage:')) {
                languages.push({ name: match[1], startIndex: i });
                break;
            }
        }
    }
});

// For each language, find end and update
for (let l = 0; l < languages.length; l++) {
    const lang = languages[l];
    let nextIndex = (l < languages.length - 1) ? languages[l + 1].startIndex : lines.length - 1;

    // Scan backwards from nextIndex to find the actual end of the current language block
    let endIndex = nextIndex - 1;
    while (endIndex > lang.startIndex && !lines[endIndex].trim().endsWith('},')) {
        endIndex--;
    }

    const trans = (lang.name === "Hindi") ? hindiTrans : baseTrans;

    // Filter out existing keys in this block
    let blockLines = lines.slice(lang.startIndex, endIndex + 1);
    Object.entries(trans).forEach(([key, val]) => {
        let keyExists = false;
        for (let i = 0; i < blockLines.length; i++) {
            if (blockLines[i].includes(`${key}:`)) {
                // Update existing if it's Hindi or if we're just enforcing the new structure
                blockLines[i] = blockLines[i].replace(/: ".*"/, `: "${val}"`);
                keyExists = true;
                break;
            }
        }
        if (!keyExists) {
            // Append at the end (before last line which is '},')
            blockLines.splice(blockLines.length - 1, 0, `            ${key}: "${val}",`);
        }
    });

    // Replace lines in original array
    // Since we're modifying the array length, we should be careful.
    // Actually simpler to just build a new array of blocks.
    lang.processedLines = blockLines;
}

// Build final content
let finalLines = lines.slice(0, languages[0].startIndex);
languages.forEach((lang, i) => {
    finalLines = finalLines.concat(lang.processedLines);
    let nextStart = (i < languages.length - 1) ? languages[i + 1].startIndex : lines.length;
    let prevEnd = languages[i].startIndex + (lang.processedLines.length - (lines.slice(languages[i].startIndex, nextStart).length - (nextStart - languages[i].startIndex)));
    // This is getting complex. Let's just use a simpler replacement.
});

// Let's try a different reconstruction strategy
let output = lines.slice(0, languages[0].startIndex).join('\n');
languages.forEach(lang => {
    output += '\n' + lang.processedLines.join('\n');
});
output += '\n' + lines.slice(lines.length - 1).join('\n'); // Add the very last brace of the whole object

fs.writeFileSync(filePath, output);
console.log("Global keys update complete with accurate block detection.");
