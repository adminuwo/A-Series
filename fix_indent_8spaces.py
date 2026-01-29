# Fix the indentation - password modal should have 8 spaces, not 12

file_path = r'e:\Series\A-Series\src\pages\Profile.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix lines 690-692 to have 8 spaces instead of 12
if len(lines) > 692:
    # Line 690: {/* Password Modal */}
    if '{/* Password Modal */}' in lines[689]:
        lines[689] = '        {/* Password Modal */}\n'  # 8 spaces
    
    # Line 691: {showPasswordModal && (
    if 'showPasswordModal' in lines[690] and '&&' in lines[690]:
        lines[690] = '        {showPasswordModal && (\n'  # 8 spaces
    
    # Line 692: <div className="fixed..."> should have 12 spaces (inside the conditional)
    # This one is already correct

# Write back
with open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.writelines(lines)

print("✅ Fixed password modal indentation to 8 spaces!")
