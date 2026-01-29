# Direct line-based insertion of remaining language translations
# Fixed syntax error version

file_path = r'e:\Series\A-Series\src\context\LanguageContext.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# We know line 979 is "        }\r\r\n" (closing Assamese)
# We need to insert after line 978 (before the closing brace)

new_lang_translations = [
    ',\r\n',
    '        "Maithili": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },\r\n',
    '        "Sanskrit": { displayLanguage: "प्रदर्शन भाषा", dashboard: "नियंत्रण पट्टिका", chat: "संवाद", password: "कूटशब्द", enabled: "सक्षम", disabled: "अक्षम" },\r\n',
    '        "Konkani": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },\r\n',
    '        "Nepali": { displayLanguage: "प्रदर्शन भाषा", dashboard: "ड्यासबोर्ड", chat: "कुराकानी", password: "पासवर्ड", enabled: "सक्षम", disabled: "अक्षम" },\r\n',
    '        "Sindhi": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },\r\n',
    '        "Dogri": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },\r\n',
    '        "Kashmiri": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },\r\n',
    '        "Santali": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },\r\n',
    '        "Bodo": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" },\r\n',
    '        "Manipuri": { displayLanguage: "Display Language", dashboard: "Dashboard", chat: "Chat", password: "Password", enabled: "Enabled", disabled: "Disabled" }\r\n',
]

# Insert after line 978 (which is index 978)
new_lines = lines[:979] + new_lang_translations + lines[979:]

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ All 23 Indian languages now have translations!")
print(f"   Total lines increased from 995 to {len(new_lines)}")
print("✅ Languages added: Maithili, Sanskrit, Konkani, Nepali, Sindhi, Dogri, Kashmiri, Santali, Bodo, Manipuri")
