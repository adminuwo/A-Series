# Direct addition of Odia and Assamese on specific line 691

file_path = r'e:\Series\A-Series\src\context\LanguageContext.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line 691 (index 690) should have Manipuri
# We need to add comma and then Odia and Assamese

if len(lines) > 690:
    manipuri_line = lines[690].rstrip()
    
    # Add comma if not present
    if not manipuri_line.endswith(','):
        lines[690] = manipuri_line + ',\r\n'
    
    # Insert Odia and Assamese after line 691
    odia_assamese = [
        '        "Odia": { displayLanguage: "ପ୍ରଦର୍ଶନ ଭାଷା", dashboard: "ଡ୍ୟାସବୋର୍ଡ", chat: "ଚାଟ୍", password: "ପାସୱାର୍ଡ", enabled: "ସକ୍ଷମ", disabled: "ଅକ୍ଷମ" },\r\n',
        '        "Assamese": { displayLanguage: "প্ৰদৰ্শন ভাষা", dashboard: "ডেছব\'ৰ্ড", chat: "চেট", password: "পাছৱৰ্ড", enabled: "সামৰ্থবান", disabled: "অসামৰ্থবান" }\r\n'
    ]
    
    # Insert after line 691 (before line 692 which is blank)
    lines = lines[:691] + odia_assamese + lines[691:]
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print("✅ Added Odia and Assamese!")
    print(f"   New total lines: {len(lines)}")
else:
    print("❌ File too short")
