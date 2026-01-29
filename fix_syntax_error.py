# Fix syntax error - remove extra comma on line 980

file_path = r'e:\Series\A-Series\src\context\LanguageContext.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line 980 (index 979) has ",\r\r\n" which should be removed
# because line 979 already has the comma after Punjabi closing brace

if len(lines) > 979 and lines[979].strip() == ',':
    # Remove this line
    lines.pop(979)
    print("✅ Removed extra comma on line 980!")
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print(f"   Total lines: {len(lines)}")
else:
    print("❌ Line 980 doesn't match expected format")
    print(f"   Line 980 content: {repr(lines[979]) if len(lines) > 979 else 'N/A'}")
