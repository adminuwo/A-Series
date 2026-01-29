# Fix the indentation issue - remove extra leading spaces from lines 690-691

file_path = r'e:\Series\A-Series\src\pages\Profile.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the malformed section with correct indentation
# The issue is extra spaces before {/* Password Modal */}
old_text = """        </div>

            {/* Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">"""

new_text = """        </div>

        {/* Password Modal */}
        {showPasswordModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">"""

content = content.replace(old_text, new_text)

# Write back
with open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("Fixed indentation - removed extra leading spaces from password modal!")
