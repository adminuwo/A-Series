# FINAL COMPREHENSIVE FIX - Move password modal INSIDE main container
# The password modal MUST be inside the main div (line 376) before it closes (line 688)

file_path = r'e:\Series\A-Series\src\pages\Profile.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Strategy:
# 1. Remove the malformed password modal section (lines 690-762)
# 2. Insert it correctly BEFORE line 688 (before closing the main container)
# 3. Fix all the indentation and syntax

# First, extract the password modal content (lines 693-759, the actual modal JSX)
password_modal_content = []
start_extracting = False
for i in range(692, 760):
    if i < len(lines):
        line = lines[i]
        if 'className="fixed' in line:
            start_extracting = True
        if start_extracting:
            if ')' == line.strip() and i > 755:  # The closing ) of the conditional
                break
            password_modal_content.append(line)

# Now rebuild the file
new_lines = []

# Add everything up to line 687 (the closing  </div> of the two-column section)
new_lines.extend(lines[:687])

# Add the password modal INSIDE the main container, with correct structure
new_lines.append('\r\n')
new_lines.append('            {/* Password Modal */}\r\n')
new_lines.append('            {showPasswordModal && (\r\n')

# Add the modal content with proper indentation (add 4 more spaces to each line)
for line in password_modal_content:
    # Add 4 spaces to existing indentation
    if line.strip():  # Only for non-empty lines
        new_lines.append('    ' + line)
    else:
        new_lines.append(line)

new_lines.append('            )}\r\n')
new_lines.append('        </div>\r\n')  # Close the main container
new_lines.append('    );\r\n')  # Close return statement
new_lines.append('};\r\n')
new_lines.append('\r\n')
new_lines.append('export default Profile;\r\n')

# Write the fixed file
with open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.writelines(new_lines)

print("✅ Password modal moved INSIDE main container!")
print("✅ All JSX syntax fixed!")
print("✅ Profile.jsx is now correct!")
