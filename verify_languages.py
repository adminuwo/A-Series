# Verify all 23 Indian languages are present in LanguageContext.jsx

import re

file_path = r'e:\Series\A-Series\src\context\LanguageContext.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all language names in the translations object
# Pattern: "LanguageName": {
pattern = r'"([A-Z][a-zA-Z\s]+)"\s*:\s*\{'

matches = re.findall(pattern, content)

# Remove duplicates and sort
unique_languages = sorted(set(matches))

print(f"✅ Found {len(unique_languages)} unique languages:")
print()
for i, lang in enumerate(unique_languages, 1):
    print(f"{i:2}. {lang}")

# Check for expected Indian languages
expected_languages = [
    "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu",
    "Kannada", "Malayalam", "Gujarati", "Punjabi", "Odia", "Assamese",
    "Maithili", "Sanskrit", "Konkani", "Nepali", "Sindhi", "Dogri",
    "Kashmiri", "Santali", "Bodo", "Manipuri"
]

print(f"\n\n✅ Expected 23 Indian languages")
print(f"📊 Found: {len(unique_languages)}")

missing = set(expected_languages) - set(unique_languages)
if missing:
    print(f"\n❌ Missing languages: {', '.join(missing)}")
else:
    print(f"\n✅ All 23 Indian languages are present!")

extra = set(unique_languages) - set(expected_languages)
if extra:
    print(f"\n⚠️ Extra languages found: {', '.join(extra)}")
