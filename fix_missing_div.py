# Add the missing wrapping div for the password modal

file_path = r'e:\Series\A-Series\src\pages\Profile.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Insert the missing line after line 692 (index 692)
if len(lines) > 692:
    # Line 692 is: {showPasswordModal && (
    # We need to insert: <div className="fixed..."> after it
    missing_div = '                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">\n'
    
    lines.insert(693, missing_div)
    
    # Also need to add a closing </div> before line 759 (which becomes 760 after insert)
    # Find the line with </motion.div>
    for i in range(755, 762):
        if '</motion.div>' in lines[i]:
            # Insert closing </div> after this line
            lines.insert(i + 1, '                </div>\n')
            break

# Write back
with open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.writelines(lines)

print("✅ Added missing wrapping div for password modal!")
