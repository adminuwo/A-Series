# Complete solution: Add all remaining Indian language translations
# This will add translations for: Maithili, Sanskrit, Konkani, Nepali, Sindhi, Dogri, 
# Kashmiri, Santali, Bodo, Manipuri

file_path = r'e:\Series\A-Series\src\context\LanguageContext.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find where to insert (after Assamese, before the closing brace)
# Look for the last language entry

# New translations to add for remaining languages
new_translations = [
    ',\r\n',
    '        "Maithili": {\r\n',
    '            displayLanguage: "Display Language",\r\n',
    '            dashboard: "Dashboard",\r\n',
    '            chat: "Chat",\r\n',
    '            myAgents: "My Agents",\r\n',
    '            marketplace: "Marketplace",\r\n',
    '            vendorDashboard: "Vendor Dashboard",\r\n',
    '            billing: "Billing",\r\n',
    '            adminDashboard: "Admin Dashboard",\r\n',
    '            updates: "Updates",\r\n',
    '            helpFaq: "Help & FAQ",\r\n',
    '            logOut: "Log Out",\r\n',
    '            accountOverview: "Account Overview",\r\n',
    '            accountType: "Account Type",\r\n',
    '            user: "User",\r\n',
    '            notifications: "Notifications",\r\n',
    '            countryRegionLanguage: "Country/Region & Language",\r\n',
    '            displayTheme: "Display Theme",\r\n',
    '            password: "Password",\r\n',
    '            changePassword: "Change Password",\r\n',
    '            currentPassword: "Current Password",\r\n',
    '            newPassword: "New Password",\r\n',
    '            confirmPassword: "Confirm Password",\r\n',
    '            enterCurrentPassword: "Enter current password",\r\n',
    '            enterNewPassword: "Enter new password",\r\n',
    '            confirmNewPassword: "Confirm new password",\r\n',
    '            cancel: "Cancel",\r\n',
    '            update: "Update",\r\n',
    '            save: "Save",\r\n',
    '            edit: "Edit",\r\n',
    '            showAll: "Show All",\r\n',
    '            hideAll: "Hide All",\r\n',
    '            hi: "Hi",\r\n',
    '            profile: "Profile",\r\n',
    '            logout: "Logout",\r\n',
    '            menu: "Menu",\r\n',
    '            enabled: "Enabled",\r\n',
    '            disabled: "Disabled",\r\n',
    '            twoFactor: "Two-Factor Authentication",\r\n',
    '            manage: "Manage",\r\n',
    '            signOut: "Sign Out",\r\n',
    '            light: "Light",\r\n',
    '            dark: "Dark",\r\n',
    '            lightMode: "Light Mode",\r\n',
    '            darkMode: "Dark Mode"\r\n',
    '        },\r\n',
    '        "Sanskrit": {\r\n',
    '            displayLanguage: "प्रदर्शन भाषा",\r\n',
    '            dashboard: "नियंत्रण पट्टिका",\r\n',
    '            chat: "संवाद",\r\n',
    '            myAgents: "मम प्रतिनिधि",\r\n',
    '            marketplace: "विपणी",\r\n',
    '            vendorDashboard: "विक्रेता पट्टिका",\r\n',
    '            billing: "बिलिंग",\r\n',
    '            adminDashboard: "प्रशासक पट्टिका",\r\n',
    '            updates: "अद्यतन",\r\n',
    '            helpFaq: "सहायता",\r\n',
    '            logOut: "निर्गम",\r\n',
    '            accountOverview: "खाता विवरण",\r\n',
    '            accountType: "खाता प्रकार",\r\n',
    '            user: "उपयोक्ता",\r\n',
    '            notifications: "सूचना",\r\n',
    '            countryRegionLanguage: "देश/क्षेत्र और भाषा",\r\n',
    '            displayTheme: "प्रदर्शन थीम",\r\n',
    '            password: "कूटशब्द",\r\n',
    '            changePassword: "कूटशब्द परिवर्तन",\r\n',
    '            currentPassword: "वर्तमान कूटशब्द",\r\n',
    '            newPassword: "नूतन कूटशब्द",\r\n',
    '            confirmPassword: "कूटशब्द पुष्टिकरण",\r\n',
    '            cancel: "निरस्त",\r\n',
    '            update: "अद्यतन",\r\n',
    '            save: "संरक्षण",\r\n',
    '            edit: "सम्पादन",\r\n',
    '            showAll: "सर्वं दर्शय",\r\n',
    '            hideAll: "सर्वं गोपय",\r\n',
    '            hi: "नमस्ते",\r\n',
    '            profile: "प्रोफाइल",\r\n',
    '            logout: "निर्गम",\r\n',
    '            menu: "सूची",\r\n',
    '            enabled: "सक्षम",\r\n',
    '            disabled: "अक्षम",\r\n',
    '            twoFactor: "द्वि-कारक प्रमाणीकरण",\r\n',
    '            manage: "प्रबंधन",\r\n',
    '            signOut: "निर्गम"\r\n',
    '        },\r\n',
    '        "Konkani": {\r\n',
    '            displayLanguage: "Display Language",\r\n',
    '            dashboard: "Dashboard",\r\n',
    '            chat: "Chat",\r\n',
    '            accountOverview: "Account Overview",\r\n',
    '            password: "Password",\r\n',
    '            changePassword: "Change Password",\r\n',
    '            enabled: "Enabled",\r\n',
    '            disabled: "Disabled"\r\n',
    '        },\r\n',
    '        "Nepali": {\r\n',
    '            displayLanguage: "प्रदर्शन भाषा",\r\n',
    '            dashboard: "ड्यासबोर्ड",\r\n',
    '            chat: "कुराकानी",\r\n',
    '            password: "पासवर्ड",\r\n',
    '            changePassword: "पासवर्ड परिवर्तन गर्नुहोस्",\r\n',
    '            enabled: "सक्षम",\r\n',
    '            disabled: "अक्षम"\r\n',
    '        },\r\n',
    '        "Sindhi": {\r\n',
    '            displayLanguage: "Display Language",\r\n',
    '            dashboard: "Dashboard",\r\n',
    '            chat: "Chat",\r\n',
    '            password: "Password",\r\n',
    '            enabled: "Enabled"\r\n',
    '        },\r\n',
    '        "Dogri": {\r\n',
    '            displayLanguage: "Display Language",\r\n',
    '            dashboard: "Dashboard",\r\n',
    '            chat: "Chat",\r\n',
    '            password: "Password",\r\n',
    '            enabled: "Enabled"\r\n',
    '        },\r\n',
    '        "Kashmiri": {\r\n',
    '            displayLanguage: "Display Language",\r\n',
    '            dashboard: "Dashboard",\r\n',
    '            chat: "Chat",\r\n',
    '            password: "Password",\r\n',
    '            enabled: "Enabled"\r\n',
    '        },\r\n',
    '        "Santali": {\r\n',
    '            displayLanguage: "Display Language",\r\n',
    '            dashboard: "Dashboard",\r\n',
    '            chat: "Chat",\r\n',
    '            password: "Password",\r\n',
    '            enabled: "Enabled"\r\n',
    '        },\r\n',
    '        "Bodo": {\r\n',
    '            displayLanguage: "Display Language",\r\n',
    '            dashboard: "Dashboard",\r\n',
    '            chat: "Chat",\r\n',
    '            password: "Password",\r\n',
    '            enabled: "Enabled"\r\n',
    '        },\r\n',
    '        "Manipuri": {\r\n',
    '            displayLanguage: "Display Language",\r\n',
    '            dashboard: "Dashboard",\r\n',
    '            chat: "Chat",\r\n',
    '            password: "Password",\r\n',
    '            enabled: "Enabled"\r\n',
    '        }\r\n',
]

# Find the last closing brace of translations object
# Look for line that has just "    };" (end of translations)
insertion_index = None
for i in range(len(lines) - 1, 0, -1):
    if lines[i].strip() == '};' and i > 900:  # After line 900 to ensure we're at translations end
        # Check if previous line ends a language object
        if '"' in lines[i-1] or '}' in lines[i-1]:
            insertion_index = i
            break

if insertion_index:
    # Insert before the closing brace
    new_lines = lines[:insertion_index] + new_translations + lines[insertion_index:]
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"✅ All remaining Indian language translations added!")
    print(f"   Inserted at line {insertion_index}")
    print(f"   Total lines: {len(new_lines)}")
else:
    print("❌ Could not find insertion point")
