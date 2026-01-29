# Comprehensive fix for Profile.jsx JSX structure
# The password modal needs to be INSIDE the main container, not outside

file_path = r'e:\Series\A-Series\src\pages\Profile.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and remove the malformed password modal section (lines 689-761)
# Then add it correctly inside the main container (before line 688)

# First, extract the password modal code (lines 690-758)
password_modal_start = None
password_modal_end = None

for i, line in enumerate(lines):
    if i >= 689 and '{/* Password Modal */}' in line:
        password_modal_start = i
    if i > 690 and password_modal_start and '</div>' in line and i < 760:
        # This is the closing div of the modal
        if '</motion.div>' in lines[i-1]:
            password_modal_end = i + 1  # Include the closing </div>
            break

if password_modal_start and password_modal_end:
    # Extract the password modal section
    modal_lines = lines[password_modal_start:password_modal_end]
    
    # Remove lines 759-761 which are malformed (the ) } and extra </div >)
    # And remove the password modal from its current wrong position
    
    # Build the new file
    new_lines = []
    
    # Add everything up to line 688 (the second-to-last closing div before modal)
    new_lines.extend(lines[:688])
    
    # Now add the password modal BEFORE closing the main container
    new_lines.append('\n')
    new_lines.extend(modal_lines)
    new_lines.append('            )}\n') # Close the modal conditional
    new_lines.append('        </div>\n')  # Close main container
    new_lines.append('    );\n')  # Close return statement
    new_lines.append('};\n')  # Close component
    new_lines.append('\n')
    new_lines.append('export default Profile;\n')
    
    # Write the fixed file
    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        f.writelines(new_lines)
    
    print("✅ Profile.jsx structure completely fixed!")
    print(f"   - Moved password modal INSIDE main container")
    print(f"   - Removed malformed closing tags")
    print(f"   - Fixed JSX structure")
else:
    print("❌ Could not find password modal section")
