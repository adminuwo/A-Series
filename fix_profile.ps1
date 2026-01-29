$file = "e:\Series\A-Series\src\pages\Profile.jsx"
$content = Get-Content $file -Raw -Encoding UTF8

# Fix the password modal opening
$content = $content -replace '\s+\{/\* Password Modal \*/\s+\}\s+\{\s+showPasswordModal\s+&&\s+\(', "`r`n`r`n            {/* Password Modal */}`r`n            {showPasswordModal && ("

# Fix the password modal closing
$content = $content -replace '\s+\)\s+\}\s+</div\s+>\s+\);', "            )}`r`n        </div>`r`n    );"

# Save the fixed content
$content | Set-Content $file -Encoding UTF8 -NoNewline

Write-Host "Profile.jsx has been fixed!"
