# PowerShell script to setup and run the dev server
$ErrorActionPreference = "Stop"

# explicit path to npm based on our findings
$npmPath = "C:\Program Files\nodejs\npm.cmd"

if (-not (Test-Path $npmPath)) {
    Write-Host "Error: Could not find npm at $npmPath" -ForegroundColor Red
    Write-Host "Please ensure Node.js is installed."
    exit 1
}

Write-Host "Installing dependencies..." -ForegroundColor Cyan
& $npmPath install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Starting development server..." -ForegroundColor Green
    & $npmPath run dev
} else {
    Write-Host "Installation failed. Please check the errors above." -ForegroundColor Red
}
