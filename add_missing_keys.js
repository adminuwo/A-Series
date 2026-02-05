const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'context', 'LanguageContext.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const missingKeys = `,
                auditLogs: {
                    title: "Audit Logs",
                    action: "Action",
                    user: "User",
                    target: "Target",
                    time: "Time"
                },
                support: {
                    title: "User Support",
                    subtitle: "Manage user complaints and inquiries",
                    all: "All",
                    open: "Open",
                    resolved: "Resolved",
                    contactUs: "Contact Us",
                    helpCenter: "Help Center",
                    security: "Security",
                    searchPlaceholder: "Search by name, email, or subject...",
                    deleteInquiry: "Delete Inquiry",
                    deleteConfirmTitle: "Delete Inquiry?",
                    deleteConfirmMessage: "This action is permanent. You are about to remove \\"{title}\\" from the database forever.",
                    cancel: "Cancel",
                    confirmDelete: "Confirm Delete",
                    selectTicket: "Select a ticket to view details",
                    selectTicketDesc: "Choose from the list on the left to manage inquiries",
                    senderDetails: "Sender Details",
                    messageContent: "Message Content",
                    resolutionNotes: "Resolution Notes & Action",
                    markResolved: "Mark Resolved",
                    notesPlaceholder: "Add internal notes about the resolution or response...",
                    submittedOn: "Submitted on",
                    noInquiries: "No inquiries found"
                }`;

// We want to insert this after 'platformSettings: { ... },' in every language block EXCEPT English (which already has it).
// But wait, English block has it. Can we simply detect if it's missing?

// Regex to find platformSettings block and look ahead.
// Iterate over all occurrences of platformSettings.

// Strategy:
// 1. Identify all locations of "platformSettings: {"
// 2. Find the matching closing brace for each.
// 3. Check if "auditLogs" follows it.
// 4. If not, insert the missingKeys.

// Since recursive brace matching is hard with regex, we'll do a simple brace counter from the start of "platformSettings: {".

function insertMissingKeys() {
    let offset = 0;
    while (true) {
        const keyStart = "platformSettings: {";
        const idx = content.indexOf(keyStart, offset);
        if (idx === -1) break;

        // Find end of this object
        let braceCount = 0;
        let endIdx = -1;
        for (let i = idx + keyStart.length - 1; i < content.length; i++) {
            if (content[i] === '{') braceCount++;
            else if (content[i] === '}') {
                braceCount--;
                if (braceCount === 0) {
                    endIdx = i;
                    break;
                }
            }
        }

        if (endIdx === -1) {
            console.error("Could not find closing brace for platformSettings at index " + idx);
            offset = idx + 1;
            continue;
        }

        // Check what follows.
        const nextPart = content.substring(endIdx + 1, endIdx + 200); // 200 chars peek
        if (!nextPart.includes('auditLogs')) {
            console.log(`Injecting keys at index ${endIdx + 1}`);
            // Insert the missing keys
            content = content.slice(0, endIdx + 1) + missingKeys + content.slice(endIdx + 1);
            // Move offset to after insertion
            offset = endIdx + 1 + missingKeys.length;
        } else {
            console.log(`Skipping - keys already present after index ${endIdx}`);
            offset = endIdx + 1;
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Done updating " + filePath);
}

insertMissingKeys();
