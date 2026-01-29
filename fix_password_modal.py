# Fix the malformed password modal JSX in Profile.jsx

file_path = r'e:\Series\A-Series\src\pages\Profile.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and fix the malformed section around line 690
# Lines are 0-indexed, so line 690 is index 689
if len(lines) > 689:
    # Check if we have the malformed structure
    if '{/* Password Modal */ }' in lines[689]:
        # Fix line 690 (index 689) - Remove the trailing } and space
        lines[689] = '            {/* Password Modal */}\n'
        
        # Fix line 691 (index 690) - Should be the opening of conditional
        if len(lines) > 690 and '{' in lines[690]:
            lines[690] = '            {showPasswordModal && (\n'
        
        # Fix line 692 (index 691) - Remove this line if it contains just the showPasswordModal
        if len(lines) > 691 and 'showPasswordModal' in lines[691] and '&&' in lines[691]:
            del lines[691]
        
        # Fix the indentation of the div (now at index 691)
        if len(lines) > 691 and 'className="fixed' in lines[691]:
            lines[691] = '                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">\n'

# Write back
with open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.writelines(lines)

print("Profile.jsx password modal syntax fixed!")
print(f"Fixed lines around 690-693")
