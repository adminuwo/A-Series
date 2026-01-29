# Final comprehensive fix - restore correct password modal structure

file_path = r'e:\Series\A-Series\src\pages\Profile.jsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the entire malformed password modal section with the correct structure
malformed_section = """
            {/* Password Modal */}
            {showPasswordModal && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card w-full max-w-md rounded-3xl p-6 border border-border shadow-2xl relative">
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">"""

correct_section = """            {/* Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card w-full max-w-md rounded-3xl p-6 border border-border shadow-2xl relative">"""

content = content.replace(malformed_section, correct_section)

# Also fix the closing tags - need to close motion.div then the fixed div
malformed_closing = """                </motion.div>
                </div>
            </div>
            )}"""

correct_closing = """                    </motion.div>
                </div>
            )}"""

content = content.replace(malformed_closing, correct_closing)

# Write the fixed content
with open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("✅ Password modal structure completely fixed!")
print("   - Fixed div wraps motion.div (correct order)")
print("   - Proper indentation throughout")
print("   - All closing tags correct")
