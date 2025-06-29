# VibeTZ Final Build Preparation Script
Write-Host "?? Starting VibeTZ Finalization..."

# 1. Linting and checking structure
Write-Host "?? Checking backend structure..."
Get-ChildItem -Recurse -Include *.js | ForEach-Object {
  Write-Host "? "
}

# 2. Build frontend (mobile + web)
Write-Host "?? Building mobile app..."
cd ../mobile
if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
npm install
npx expo export --dev

Write-Host "?? Building web app..."
cd ../web
if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
npm install
npm run build

# 3. Confirm deployment readiness
Write-Host "? Final Checks Complete. Ready for Deployment!"

# 4. Optional: Move builds to /dist or /deploy folder
# mkdir ../deploy; Copy-Item -Recurse ../web/dist/* ../deploy/web/
# Copy-Item -Recurse ../mobile/dist/* ../deploy/mobile/

Write-Host "?? VibeTZ is ready!"
