# Remove all duplicate language entries and fix structure
# The issue: After adding new languages, old ones are still there creating duplicates

file_path = r'e:\Series\A-Series\src\context\LanguageContext.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The problem is that after Manipuri (line 999), there's a duplicate Odia section
# We need to find where the translations object closes and remove everything between
# Manipuri and the closing brace

# Find the position of "Manipuri" closing
# Then find the next "};" which should close the translations object
# Everything in between should be removed

# Let's read line by line and fix
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with Manipuri
manipuri_line = None
for i, line in enumerate(lines):
    if '"Manipuri":' in line:
        manipuri_line = i
        break

if manipuri_line:
    # Now find the closing brace after Manipuri
    # Manipuri is a one-liner, so next significant line should be the translations closing
    # But we have duplicates, so let's find where translations object should end
    
    # Look for the line that has just "    };" after Manipuri
    # But skip any duplicate entries
    closing_brace_line = None
    for i in range(manipuri_line + 1, len(lines)):
        # Check if this is a language name (indicating duplicate)
        if '"Odia":' in lines[i] or '"Gujarati":' in lines[i] or '"Assamese":' in lines[i]:
            # This is a duplicate, we need to find its end and remove all duplicates
            # Let's find the actual closing brace of translations
            for j in range(i, len(lines)):
                stripped = lines[j].strip()
                if stripped == '};' and j > 900:  # Make sure it's after line 900
                    # Check if next line is blank or has "const t = "
                    if j + 1 < len(lines) and ('const t' in lines[j+1] or lines[j+1].strip() == ''):
                        closing_brace_line = j
                        break
            break
    
    if closing_brace_line:
        # Now remove everything from manipuri_line + 1 to closing_brace_line - 1
        # And add proper closing
        new_lines = lines[:manipuri_line + 1]
        # Add blank line and closing brace
        new_lines.append('\r\n')
        new_lines.extend(lines[closing_brace_line:])
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        
        print(f"✅ Removed duplicate entries!")
        print(f"   Kept lines up to {manipuri_line + 1}")
        print(f"   Removed lines {manipuri_line + 2} to {closing_brace_line - 1}")
        print(f"   New total lines: {len(new_lines)}")
    else:
        print("❌ Could not find closing brace")
else:
    print("❌ Could not find Manipuri line")
