# 1. Hakikisha uko kwenye mzizi wa VibeTZ_clean
Set-Location "D:\VibeTZ_clean"

# 2. Build Mobile (Android/iOS)
Write-Host "`n?? Building Mobile App (Expo)" -ForegroundColor Cyan
cd .\mobile
if (-Not (Test-Path "assets")) { mkdir assets }
if (-Not (Test-Path "assets\icon.png")) {
    Invoke-WebRequest "https://img.icons8.com/?size=512&id=117693&format=png" -OutFile "assets\icon.png"
}
eas build -p android --profile preview
cd ..

# 3. Build Web (React)
Write-Host "`n?? Building Web App" -ForegroundColor Cyan
cd .\web
npm install --force
npm run build
cd ..

# 4. Build Desktop (Electron)
Write-Host "`n??? Building Desktop App" -ForegroundColor Cyan
cd .\web
npm run build
npm run electron:build
cd ..

# 5. Success Message
Write-Host "`n? VibeTZ Packaging Kamilika! App iko tayari kwa matumizi ya Web, Mobile na Desktop." -ForegroundColor Green
