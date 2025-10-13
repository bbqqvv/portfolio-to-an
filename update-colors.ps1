# PowerShell Script to Update Colors from Orange/Amber to Rose Pink/Lavender

Write-Host "🌸 Converting Orange/Amber → Rose Pink/Lavender..." -ForegroundColor Magenta

# Define file patterns to search
$fileExtensions = @("*.tsx", "*.ts", "*.jsx", "*.js", "*.css")
$rootPath = "D:\WorkSpace\Nextjs\portfolio-to-an\src"

# Color mapping
$colorMappings = @{
    # Tailwind classes
    "orange-50" = "pink-50"
    "orange-100" = "pink-100"
    "orange-200" = "pink-200"
    "orange-300" = "pink-300"
    "orange-400" = "pink-400"
    "orange-500" = "pink-500"
    "orange-600" = "pink-600"
    "orange-700" = "pink-700"
    "orange-800" = "pink-800"
    "orange-900" = "pink-900"
    
    "amber-50" = "purple-50"
    "amber-100" = "purple-100"
    "amber-200" = "purple-200"
    "amber-300" = "purple-300"
    "amber-400" = "purple-400"
    "amber-500" = "purple-500"
    "amber-600" = "purple-600"
    "amber-700" = "purple-700"
    "amber-800" = "purple-800"
    "amber-900" = "purple-900"
    
    # Specific gradients need special handling
    "from-orange-50" = "from-pink-50"
    "to-amber-50" = "to-purple-50"
    "via-amber-500" = "via-purple-500"
}

$filesUpdated = 0
$replacements = 0

# Get all matching files
$files = Get-ChildItem -Path $rootPath -Include $fileExtensions -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $fileModified = $false
    
    foreach ($old in $colorMappings.Keys) {
        $new = $colorMappings[$old]
        if ($content -match $old) {
            $content = $content -replace $old, $new
            $fileModified = $true
            $replacements++
        }
    }
    
    if ($fileModified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "✓ Updated: $($file.Name)" -ForegroundColor Green
        $filesUpdated++
    }
}

Write-Host "`n✨ Conversion Complete!" -ForegroundColor Magenta
Write-Host "Files updated: $filesUpdated" -ForegroundColor Cyan
Write-Host "Total replacements: $replacements" -ForegroundColor Cyan
Write-Host "`n🌸 Your portfolio is now Rose Pink & Lavender! 💜" -ForegroundColor Magenta
