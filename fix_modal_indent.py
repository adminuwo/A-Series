# Fix only the indentation of lines 690-691
# The structure is correct now, just need to fix indentation

file_path = r'e:\Series\A-Series\src\pages\Profile.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix the indentation on lines 690-691
# They currently have 8 spaces, but should have 12 spaces (inside the max-w-4xl container)
if len(lines) > 691:
    lines[689] = '\n'  # Empty line stays empty
    lines[690] = '            {/* Password Modal */}\n'  # 12 spaces
    lines[691] = '            {showPasswordModal && (\n'  # 12 spaces

# Write back
with open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.writelines(lines)

print("✅ Fixed password modal indentation!")
