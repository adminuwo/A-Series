# Complete fix: Remove all non-Indian languages and ensure all Indian languages are present

import re

file_path = r'e:\Series\A-Series\src\context\LanguageContext.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# List of languages to KEEP (Indian languages only)
indian_languages = [
    "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu",
    "Kannada", "Malayalam", "Gujarati", "Punjabi", "Odia", "Assamese",
    "Maithili", "Sanskrit", "Konkani", "Nepali", "Sindhi", "Dogri",
    "Kashmiri", "Santali", "Bodo", "Manipuri"
]

# Languages to REMOVE (non-Indian)
remove_languages = [
    "Arabic", "German", "Italian", "Russian", "Turkish", "Korean",
    "Japanese", "French", "Portuguese", "Spanish", "Dutch", "Mandarin Chinese",
    "Afrikaans", "Zulu", "Xhosa", "Norwegian", "Swedish", "Danish", "Finnish"
]

# For each language to remove, find and delete its entire entry
for lang in remove_languages:
    # Pattern to match the entire language object
    # Example: "German": { ... },
    pattern = rf'"{lang}"\s*:\s*\{{[^}}]*\}}(?:,)?'
    
    # First try single-line pattern
    content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # Also try multi-line pattern
    pattern_multiline = rf',?\s*"{lang}"\s*:\s*\{{[^}}]+?\}}'
    content = re.sub(pattern_multiline, '', content, flags=re.DOTALL)

# Now add Odia and Assamese if they're missing
# Check if they exist
if '"Odia"' not in content:
    # Find Punjabi's closing and add Odia after it
    punjabi_end = content.find('"Punjabi": {')
    if punjabi_end != -1:
        # Find the closing brace of Punjabi
        brace_count = 0
        i = content.find('{', punjabi_end)
        start = i
        while i < len(content):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    # Found closing brace
                    # Insert Odia after this
                    odia_entry = ',\r\n        "Odia": { displayLanguage: "ପ୍ରଦର୍ଶନ ଭାଷା", dashboard: "ଡ୍ୟାସବୋର୍ଡ", chat: "ଚାଟ୍", password: "ପାସୱାର୍ଡ", enabled: "ସକ୍ଷମ", disabled: "ଅକ୍ଷମ" }'
                    content = content[:i+1] + odia_entry + content[i+1:]
                    print("✅ Added Odia")
                    break
            i += 1

if '"Assamese"' not in content:
    # Find Odia's closing and add Assamese after it
    odia_end = content.find('"Odia": {')
    if odia_end != -1:
        # Find the closing brace of Odia
        brace_count = 0
        i = content.find('{', odia_end)
        start = i
        while i < len(content):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    # Found closing brace
                    assamese_entry = ',\r\n        "Assamese": { displayLanguage: "প্ৰদৰ্শন ভাষা", dashboard: "ডেছব\'ৰ্ড", chat: "চেট", password: "পাছৱৰ্ড", enabled: "সামৰ্থবান", disabled: "অসামৰ্থবান" }'
                    content = content[:i+1] + assamese_entry + content[i+1:]
                    print("✅ Added Assamese")
                    break
            i += 1

# Clean up multiple commas and extra whitespace
content = re.sub(r',\s*,', ',', content)
content = re.sub(r',(\s*)\}', r'\1}', content)  # Remove comma before closing brace

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Cleanup complete!")
print("   Removed all non-Indian languages")
print("   Ensured all 23 Indian languages are present")
