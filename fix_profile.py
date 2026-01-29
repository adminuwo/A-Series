import re

# Read the file
with open(r'e:\Series\A-Series\src\pages\Profile.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix line 758 (index 757 in 0-indexed list)
if len(lines) > 757:
    lines[757] = '            </div>\r\n'
    # Add the closing parenthesis on the next line if it doesn't exist
    if len(lines) > 758 and ')}' not in lines[758]:
        lines.insert(758, '            )}\r\n')

# Write back
with open(r'e:\Series\A-Series\src\pages\Profile.jsx', 'w', encoding='utf-8', newline='') as f:
    f.writelines(lines)

print("Profile.jsx has been fixed!")
